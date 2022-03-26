package tomeit

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"net/http"
	"strings"

	"github.com/minguu42/tomeit/logger"
)

type userKey struct{}

func Auth(db dbInterface, firebaseApp firebaseAppInterface) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/v0/healthz" {
				next.ServeHTTP(w, r)
				return
			}

			ctx := r.Context()

			if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
				_ = writeResponse(w, http.StatusBadRequest, newErrInvalidRequest(errors.New("authorization header format is invalid")))
				return
			}
			idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
			token, err := firebaseApp.VerifyIDToken(ctx, idToken)
			if err != nil {
				logger.Error.Println("firebaseApp.VerifyIDToken failed:", err)
				_ = writeResponse(w, http.StatusUnauthorized, newErrAuthentication(err))
				return
			}

			user, err := db.getUserByDigestUID(hash(token.UID))
			if user == nil || err != nil {
				user, err = db.createUser(hash(token.UID))
				if err != nil {
					logger.Error.Println("db.createUser failed:", err)
					_ = writeResponse(w, http.StatusInternalServerError, newErrInternalServer(err))
					return
				}
			}

			next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, userKey{}, user)))
		})
	}
}

func hash(token string) string {
	bytes := sha256.Sum256([]byte(token))
	return hex.EncodeToString(bytes[:])
}
