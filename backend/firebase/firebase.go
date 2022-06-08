package firebase

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

// NewFirebaseApp は Firebase の認証を行い、firebase.App を返す。
func NewFirebaseApp(ctx context.Context, googleCredentialsJSON string) (*firebase.App, error) {
	app, err := firebase.NewApp(ctx, nil, option.WithCredentialsJSON([]byte(googleCredentialsJSON)))
	if err != nil {
		return nil, fmt.Errorf("failed to create firebase app. %w", err)
	}
	return app, nil
}
