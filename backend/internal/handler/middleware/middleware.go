// Package middleware はミドルウェアを定義するパッケージ
package middleware

import "github.com/minguu42/tomeit/internal/service"

// Middleware -
type Middleware struct {
	svc service.Service
}

// New は Middleware を初期化し、返す。
func New(svc service.Service) *Middleware {
	return &Middleware{
		svc: svc,
	}
}
