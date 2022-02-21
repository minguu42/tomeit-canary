package tomeit

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"strings"

	"github.com/minguu42/tomeit/logger"
)

type key int

var userKey key

func Auth(db dbInterface, firebaseApp firebaseAppInterface) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authorization := strings.Split(r.Header.Get("Authorization"), " ")
			if authorization[0] != "Bearer" {
				logger.Error.Println("JWT is required.")
				// TODO: エラーレスポンスを生成する
				return
			}
			idToken := authorization[1]

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

			next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, userKey, user)))
		})
	}
}

func hash(token string) string {
	bytes := sha256.Sum256([]byte(token))
	return hex.EncodeToString(bytes[:])
}
