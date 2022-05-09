package tomeit

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"log"
	"net/http"
	"strings"
)

type userKey struct{}

func Auth(authenticator Authenticator) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/v0/healthz" {
				next.ServeHTTP(w, r)
				return
			}

			ctx := r.Context()

			if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
				log.Printf("header Authorization is invalid")
				_ = writeErrResponse(w, newErrUnauthorized(errors.New("header Authorization format is invalid")))
				return
			}
			idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
			token, err := authenticator.verifyIDToken(ctx, idToken)
			if err != nil {
				log.Printf("Authenticator.verifyIDToken failed: %v", err)
				_ = writeErrResponse(w, newErrUnauthorized(err))
				return
			}

			user, err := getUserByDigestUID(ctx, hash(token.UID))
			if user == nil || err != nil {
				user, err = createUser(ctx, hash(token.UID))
				if err != nil {
					log.Printf("createUser failed: %v", err)
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
