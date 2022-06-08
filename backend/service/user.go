package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	firebase "firebase.google.com/go/v4"
	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/model"
)

// UserService は User エンティティの CRUD インタフェース
type UserService interface {
	CreateUser(ctx context.Context, digestUID string) (*model.User, error)
	GetUser(ctx context.Context, digestUID string) (*model.User, error)
	VerifyIDToken(ctx context.Context, idToken string) (string, error)
}

// userService は UserService を実装する構造体
type userService struct {
	dialect     *goqu.DialectWrapper
	db          *sql.DB
	firebaseApp *firebase.App
}

// NewUserService は UserService を満たす構造体を初期化し、返す。
func NewUserService(dialect *goqu.DialectWrapper, db *sql.DB, firebaseApp *firebase.App) (*userService, error) {
	switch {
	case dialect == nil:
		return nil, errors.New("dialect is required")
	case db == nil:
		return nil, errors.New("db is required")
	case firebaseApp == nil:
		return nil, errors.New("firebaseApp is required")
	}

	return &userService{
		dialect:     dialect,
		db:          db,
		firebaseApp: firebaseApp,
	}, nil
}

// CreateUser は DB に model.User を作成し、返す。
func (s *userService) CreateUser(ctx context.Context, digestUID string) (*model.User, error) {
	createdAt := time.Now()
	query, _, err := s.dialect.Insert("users").Rows(
		model.User{
			DigestUID: digestUID,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		},
	).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create insert sql. %w", err)
	}

	result, err := s.db.ExecContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &model.User{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}, nil
}

// GetUser は DB から model.User を取得し、返す。
func (s *userService) GetUser(ctx context.Context, digestUID string) (*model.User, error) {
	query, _, err := s.dialect.From("users").Select(&model.User{}).Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var u model.User
	if err := s.db.QueryRowContext(ctx, query).Scan(&u.CreatedAt, &u.DigestUID, &u.ID, &u.RestCount, &u.UpdatedAt); err != nil {
		return nil, fmt.Errorf("failed to get user row. %w", err)
	}

	return &u, nil
}

// VerifyIDToken は Firebase Authentication で ID トークンを検証し、ID トークンが正当なものである場合はそのユーザの UID を返す。
func (s *userService) VerifyIDToken(ctx context.Context, idToken string) (string, error) {
	client, err := s.firebaseApp.Auth(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to create firebase auth client. %w", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return "", fmt.Errorf("failed to verify ID token. %w", err)
	}

	return token.UID, err
}
