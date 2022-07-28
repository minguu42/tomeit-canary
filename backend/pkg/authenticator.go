package tomeit

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

// Authenticator はユーザ認証処理のインタフェース
type Authenticator interface {
	VerifyIDToken(ctx context.Context, idToken string) (uid string, err error)
}

var authenticator Authenticator

// SetAuthenticator はパッケージ変数authenticatorに値を代入する。
// これは初期化処理時に1度のみ呼び出す。
func SetAuthenticator(auth Authenticator) {
	authenticator = auth
}

// firebaseAuth はAuthenticatorを実装する構造体
type firebaseAuth struct {
	app *firebase.App
}

// NewFirebaseAuth はfirebaseAuthを初期化し、返す。
func NewFirebaseAuth(ctx context.Context, googleCredentialsJSON string) (Authenticator, error) {
	app, err := firebase.NewApp(ctx, nil, option.WithCredentialsJSON([]byte(googleCredentialsJSON)))
	if err != nil {
		return nil, fmt.Errorf("failed to create firebase app. %w", err)
	}

	return &firebaseAuth{app: app}, nil
}

// VerifyIDToken はFirebase AuthenticationでIDトークンを検証し、IDトークンが正当なものである場合はそのユーザのUIDを返す。
func (a firebaseAuth) VerifyIDToken(ctx context.Context, idToken string) (uid string, err error) {
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
