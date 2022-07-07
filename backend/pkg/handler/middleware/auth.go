package middleware

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"errors"
	"net/http"
	"strings"

	"github.com/minguu42/tomeit/pkg/handler/utils"
	"github.com/minguu42/tomeit/pkg/log"
	"github.com/minguu42/tomeit/pkg/model"
)

// UserKey はコンテキストでユーザを管理するためのキー
type UserKey struct{}

// Auth はユーザ認証を行うミドルウェア
func (m *Middleware) Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/healthz" {
			next.ServeHTTP(w, r)
			return
		}

		ctx := r.Context()

		if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
			utils.WriteErrorResponse(w, model.NewErrUnauthorized(errors.New(`format of Authorization field should be "Bearer some-id-token"`)))
			log.Info("format of Authorization is invalid")
			return
		}
		idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
		uid, err := m.auth.VerifyIDToken(ctx, idToken)
		if err != nil {
			utils.WriteErrorResponse(w, model.NewErrUnauthorized(err))
			log.Info("failed to authenticate user.", err)
			return
		}

		user, err := m.svc.GetUser(ctx, hash(uid))
		switch {
		case errors.Is(err, sql.ErrNoRows):
			if user, err = m.svc.CreateUser(ctx, hash(uid)); err != nil {
				utils.WriteErrorResponse(w, model.NewErrInternalServerError(err))
				log.Error("failed to create user.", err)
				return
			}
		case err != nil:
			utils.WriteErrorResponse(w, model.NewErrInternalServerError(err))
			log.Error("failed to get user.", err)
			return
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, UserKey{}, user)))
	})
}

func hash(token string) string {
	bytes := sha256.Sum256([]byte(token))
	return hex.EncodeToString(bytes[:])
}
