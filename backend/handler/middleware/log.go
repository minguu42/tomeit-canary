package middleware

import (
	"net/http"

	"github.com/go-chi/chi/v5/middleware"
)

// Log は各リクエストに対する処理の開始と終わりにログを出力するミドルウェア
func (m *Middleware) Log(next http.Handler) http.Handler {
	return middleware.Logger(next)
}
