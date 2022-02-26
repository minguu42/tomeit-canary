package tomeit

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"strings"

	"github.com/minguu42/tomeit/logger"
)

type userKey struct{}

func Auth(db dbInterface, firebaseApp firebaseAppInterface) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path == "/v0/health" {
				next.ServeHTTP(w, r)
				return
			}

			if !strings.HasPrefix(r.Header.Get("Authorization"), "Bearer ") {
				// TODO: エラーレスポンスを生成する
				return
			}
			idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]

			ctx := r.Context()

			token, err := firebaseApp.VerifyIDToken(ctx, idToken)
			if err != nil {
				logger.Error.Println("firebaseApp.VerifyIDToken failed:", err)
				// TODO: エラーレスポンスを生成する
				return
			}

			user, err := db.GetUserByDigestUID(hash(token.UID))
			if user == nil || err != nil {
				user, err = db.CreateUser(hash(token.UID))
				if err != nil {
					logger.Error.Println("db.CreateUser failed:", err)
					// TODO: エラーレスポンスを生成する
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
