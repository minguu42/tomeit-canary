package tomeit

import "github.com/go-chi/chi/v5"

// Route はエンドポイントとハンドラを対応させる。
func Route(r chi.Router) {
	r.Get("/healthz", getHealthz)
}
