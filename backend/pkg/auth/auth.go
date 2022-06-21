// Package auth はユーザ認証を実装するパッケージ
package auth

import (
	"context"
	"errors"
	"fmt"

	firebase "firebase.google.com/go/v4"
)

// Authenticator はユーザ認証処理のインタフェース
type Authenticator interface {
	VerifyIDToken(ctx context.Context, idToken string) (uid string, err error)
}

// authenticator は Authenticator を実装する構造体
type authenticator struct {
	firebaseApp *firebase.App
}

// New は Authenticator を実装する構造体を初期化し、返す。
func New(firebaseApp *firebase.App) (*authenticator, error) {
	if firebaseApp == nil {
		return nil, errors.New("app is required")
	}

	return &authenticator{
		firebaseApp: firebaseApp,
	}, nil
}

// VerifyIDToken は Firebase Authentication で ID トークンを検証し、ID トークンが正当なものである場合はそのユーザの UID を返す。
func (a *authenticator) VerifyIDToken(ctx context.Context, idToken string) (uid string, err error) {
	client, err := a.firebaseApp.Auth(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to create firebase auth client. %w", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return "", fmt.Errorf("failed to verify ID token. %w", err)
	}

	return token.UID, nil
}

// Mock は Authenticator を実装するモック
type Mock struct{}

func (m *Mock) VerifyIDToken(_ context.Context, _ string) (uid string, err error) {
	return "someUID", nil
}
