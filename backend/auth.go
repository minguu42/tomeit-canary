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

func Auth(authenticator authenticator) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/v0/healthz" {
				next.ServeHTTP(w, r)
				return
			}

			ctx := r.Context()

			if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
				_ = writeErrResponse(w, newErrUnauthorized(errors.New("header Authorization format is invalid")))
				return
			}
			idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
			token, err := authenticator.VerifyIDToken(ctx, idToken)
			if err != nil {
				logger.Error.Println("authenticator.VerifyIDToken failed:", err)
				_ = writeErrResponse(w, newErrUnauthorized(err))
				return
			}

			user, err := getUserByDigestUID(ctx, hash(token.UID))
			if user == nil || err != nil {
				user, err = createUser(ctx, hash(token.UID))
				if err != nil {
					logger.Error.Println("createUser failed:", err)
					_ = writeErrResponse(w, newErrInternalServerError(err))
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
