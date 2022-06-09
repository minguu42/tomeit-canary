package middleware

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"strings"
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
			// TODO: エラーレスポンスの生成
			return
		}
		idToken := strings.Split(r.Header.Get("Authorization"), " ")[1]
		uid, err := m.svc.VerifyIDToken(ctx, idToken)
		if err != nil {
			// TODO: エラーレスポンスの生成
			return
		}

		user, err := m.svc.GetUser(ctx, hash(uid))
		// TODO: ここの処理を見直す。
		// やりたいことは最初にログインして MySQL にデータが存在しない場合は作成する。
		// 取得をそもそも失敗している場合はエラーレスポンスを生成する。
		if user == nil || err != nil {
			user, err = m.svc.CreateUser(ctx, hash(uid))
			if err != nil {
				// TODO: エラーレスポンスの生成
				return
			}
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, UserKey{}, user)))
	})
}

func hash(token string) string {
	bytes := sha256.Sum256([]byte(token))
	return hex.EncodeToString(bytes[:])
}
