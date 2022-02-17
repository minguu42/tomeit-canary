package tomeit

import (
	"context"
	"fmt"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

type firebaseAppInterface interface {
	verifyIDToken(ctx context.Context, idToken string) (*auth.Token, error)
}

type FirebaseApp struct {
	*firebase.App
}

func InitFirebaseApp() (*FirebaseApp, error) {
	app, err := firebase.NewApp(context.Background(), nil, option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_CREDENTIALS_JSON"))))
	if err != nil {
		return nil, fmt.Errorf("firebase.NewApp failed: %w", err)
	}
	return &FirebaseApp{app}, nil
}

func (app *FirebaseApp) verifyIDToken(ctx context.Context, idToken string) (*auth.Token, error) {
	client, err := app.Auth(ctx)
	if err != nil {
		return nil, fmt.Errorf("app.Auth failed: %w", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return nil, fmt.Errorf("client.verifyIDToken failed: %w", err)
	}

	return token, nil
}

type firebaseAppMock struct{}

func (app *firebaseAppMock) verifyIDToken(_ context.Context, _ string) (*auth.Token, error) {
	token := auth.Token{
		UID: "someUserUID",
	}
	return &token, nil
}
