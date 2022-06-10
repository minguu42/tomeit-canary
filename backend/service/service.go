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

// Mock はテストで使用する Service を満たすモック
type Mock struct{}

func (s *Mock) CreateUser(_ context.Context, _ string) (*model.User, error) {
	return &model.User{
		ID:        1,
		DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
		RestCount: 0,
		CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
	}, nil
}

func (s *Mock) GetUser(_ context.Context, _ string) (*model.User, error) {
	return &model.User{
		ID:        1,
		DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
		RestCount: 0,
		CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
	}, nil
}

func (s *Mock) VerifyIDToken(_ context.Context, _ string) (string, error) {
	return "someUID", nil
}

func (s *Mock) CreateTask(_ context.Context, _ int, _ string, _ int, _ *time.Time) (*model.Task, error) {
	return &model.Task{
		ID:               1,
		UserID:           1,
		Title:            "タスク1",
		EstimatedPomoNum: 4,
		DueOn:            nil,
		CompletedOn:      nil,
		CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
	}, nil
}

func (s *Mock) GetTask(_ context.Context, _ int) (*model.Task, error) {
	return &model.Task{
		ID:               1,
		UserID:           1,
		Title:            "タスク1",
		EstimatedPomoNum: 4,
		DueOn:            nil,
		CompletedOn:      nil,
		CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
	}, nil
}

func (s *Mock) GetTasks(_ context.Context, _ int, _ *model.ReadTaskRequest) ([]*model.Task, error) {
	return []*model.Task{
		{
			ID:               1,
			UserID:           1,
			Title:            "タスク1",
			EstimatedPomoNum: 4,
			DueOn:            nil,
			CompletedOn:      nil,
			CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
			UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		},
		{
			ID:               2,
			UserID:           1,
			Title:            "タスク2",
			EstimatedPomoNum: 0,
			DueOn:            nil,
			CompletedOn:      nil,
			CreatedAt:        time.Date(2021, 7, 10, 0, 0, 0, 0, time.Local),
			UpdatedAt:        time.Date(2021, 7, 10, 0, 0, 0, 0, time.Local),
		},
	}, nil
}

func (s *Mock) UpdateTask(_ context.Context, _ *model.Task) error {
	return nil
}

func (s *Mock) DeleteTask(_ context.Context, _ int) error {
	return nil
}
