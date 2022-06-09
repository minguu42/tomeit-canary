// Package router はハンドラとエンドポイントを結びつけるルータを定義するパッケージ
package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/minguu42/tomeit/handler"
)

// Route はハンドラとエンドポイントを結びつける。
func Route(r chi.Router, h *handler.Handler) {
	r.Route("/tasks", func(r chi.Router) {
		r.Post("/", h.CreateTask)
		r.Get("/", h.ReadTask)
		r.Patch("/{taskID}", h.UpdateTask)
		r.Delete("/{taskID}", h.DeleteTask)
	})

	r.Get("/healthz", h.GetHealthz)
}
