package middleware

import (
	"net/http"

	"github.com/go-chi/chi/v5/middleware"
)

// Recover は各リクエストに対する処理でパニックが発生した場合にリカバリーを行うミドルウェア
func (m *Middleware) Recover(next http.Handler) http.Handler {
	return middleware.Recoverer(next)
}
