// Package middleware はミドルウェアを定義するパッケージ
package middleware

import "github.com/minguu42/tomeit/service"

// Middleware -
type Middleware struct {
	userService service.UserService
}

// New は Middleware を初期化して、返す。
func New(userService service.UserService) *Middleware {
	return &Middleware{
		userService: userService,
	}
}
