package tomeit

import "context"

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

type authenticatorMock struct{}

func (a *authenticatorMock) VerifyIDToken(_ context.Context, _ string) (uid string, err error) {
	return "someUID", nil
}
