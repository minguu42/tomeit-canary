// Package handler は各エンドポイントに対応するハンドラを定義するパッケージ
package handler

import (
	"github.com/go-chi/chi/v5"
	"github.com/minguu42/tomeit/service"
)

// Handler -
type Handler struct {
	svc service.Service
}

// New は Handler を初期化し、返す。
func New(svc service.Service) *Handler {
	return &Handler{
		svc: svc,
	}
}

// Route はハンドラとエンドポイントを対応させる。
func (h *Handler) Route(r chi.Router) {
	r.Route("/tasks", func(r chi.Router) {
		r.Post("/", h.CreateTask)
		r.Get("/", h.ReadTask)
		r.Patch("/{taskID}", h.UpdateTask)
		r.Delete("/{taskID}", h.DeleteTask)
	})

	r.Get("/healthz", h.GetHealthz)
}
