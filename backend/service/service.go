// Package service は各エンティティの CRUD を実装するパッケージ
package service

import (
	"context"
	"database/sql"
	"errors"
	"time"

	firebase "firebase.google.com/go/v4"
	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/model"
)

// Service は各エンティティの CRUD 処理のインタフェース
type Service interface {
	CreateUser(ctx context.Context, digestUID string) (*model.User, error)
	GetUser(ctx context.Context, digestUID string) (*model.User, error)
	VerifyIDToken(ctx context.Context, idToken string) (string, error)

	CreateTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*model.Task, error)
	GetTask(ctx context.Context, id int) (*model.Task, error)
	GetTasks(ctx context.Context, userID int, opt *model.ReadTaskRequest) ([]*model.Task, error)
	UpdateTask(ctx context.Context, task *model.Task) error
	DeleteTask(ctx context.Context, id int) error
}

// service は Service を実装する構造体
type service struct {
	dialect     *goqu.DialectWrapper
	db          *sql.DB
	firebaseApp *firebase.App
}

// New は Service を満たす構造体を初期化し、返す。
func New(dialect *goqu.DialectWrapper, db *sql.DB, firebaseApp *firebase.App) (*service, error) {
	switch {
	case dialect == nil:
		return nil, errors.New("dialect is required")
	case db == nil:
		return nil, errors.New("db is required")
	case firebaseApp == nil:
		return nil, errors.New("firebaseApp is required")
	}

	return &service{
		dialect:     dialect,
		db:          db,
		firebaseApp: firebaseApp,
	}, nil
}
