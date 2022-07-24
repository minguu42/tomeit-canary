package tomeit

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"errors"
	"net/http"
	"strings"

	"github.com/minguu42/tomeit/pkg/logging"
)

// userKey はコンテキストでユーザを管理するためのキー
type userKey struct{}

// AuthMiddleware はユーザ認証を行うミドルウェア
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/healthz" {
			next.ServeHTTP(w, r)
			return
		}

		ctx := r.Context()

		if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
			writeErrorResponse(w, newErrUnauthorized(errors.New(`format of Authorization field should be "Bearer some-id-token"`)))
			logging.Info("format of Authorization is invalid")
			return
		}
		idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
		uid, err := authenticator.VerifyIDToken(ctx, idToken)
		if err != nil {
			writeErrorResponse(w, newErrUnauthorized(err))
			logging.Info("failed to authenticate user.", err)
			return
		}

		user, err := dbOperator.GetUser(ctx, hash(uid))
		switch {
		case errors.Is(err, sql.ErrNoRows):
			if user, err = dbOperator.CreateUser(ctx, hash(uid)); err != nil {
				writeErrorResponse(w, newErrInternalServerError(err))
				logging.Error("failed to create user.", err)
				return
			}
		case err != nil:
			writeErrorResponse(w, newErrInternalServerError(err))
			logging.Error("failed to get user.", err)
			return
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, userKey{}, user)))
	})
}

func hash(token string) string {
	bytes := sha256.Sum256([]byte(token))
	return hex.EncodeToString(bytes[:])
}
