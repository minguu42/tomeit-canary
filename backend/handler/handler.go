// Package handler は各エンドポイントに対応するハンドラを定義するパッケージ
package handler

import "github.com/minguu42/tomeit/service"

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
