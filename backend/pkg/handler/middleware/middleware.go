// Package middleware はミドルウェアを定義するパッケージ
package middleware

import (
	"github.com/minguu42/tomeit/pkg/auth"
	"github.com/minguu42/tomeit/pkg/service"
)

// Middleware -
type Middleware struct {
	svc  service.Service
	auth auth.Authenticator
}

// New は Middleware を初期化し、返す。
func New(svc service.Service, auth auth.Authenticator) *Middleware {
	return &Middleware{
		svc:  svc,
		auth: auth,
	}
}
