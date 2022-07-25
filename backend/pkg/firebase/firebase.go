// Package firebase は Firebase を扱うパッケージ
package firebase

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go/v4"
	tomeit "github.com/minguu42/tomeit/pkg"
	"google.golang.org/api/option"
)

// authenticator はtomeit.Authenticatorを実装する構造体
type authenticator struct {
	app *firebase.App
}

// NewAuthenticator はtomeit.Authenticatorを実装する構造体を初期化し、返す。
func NewAuthenticator(ctx context.Context, googleCredentialsJSON string) (tomeit.Authenticator, error) {
	app, err := firebase.NewApp(ctx, nil, option.WithCredentialsJSON([]byte(googleCredentialsJSON)))
	if err != nil {
		return nil, fmt.Errorf("failed to create firebase app. %w", err)
	}

	return &authenticator{app: app}, nil
}

// VerifyIDToken はFirebase AuthenticationでIDトークンを検証し、IDトークンが正当なものである場合はそのユーザのUIDを返す。
func (a *authenticator) VerifyIDToken(ctx context.Context, idToken string) (uid string, err error) {
	client, err := a.app.Auth(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to create firebase auth client. %w", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return "", fmt.Errorf("failed to verify ID token. %w", err)
	}

	return token.UID, nil
}
