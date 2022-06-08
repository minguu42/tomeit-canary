package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/minguu42/tomeit/handler"
)

// Route はハンドラ関数とエンドポイントを対応させる。
func Route(r chi.Router) {
	h := handler.New()
	r.Get("/healthz", h.GetHealthz)
}
