package tomeit

import (
	"context"
	"time"
)

// DBOperator は各モデルのCRUD処理のインタフェース
type DBOperator interface {
	CreateUser(ctx context.Context, digestUID string) (*User, error)
	GetUser(ctx context.Context, digestUID string) (*User, error)

	CreateTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*Task, error)
	GetTask(ctx context.Context, id int) (*Task, error)
	GetTasks(ctx context.Context, userID int, opt *GetTasksRequest) ([]*Task, error)
	UpdateTask(ctx context.Context, task *Task) error
	DeleteTask(ctx context.Context, id int) error
}

var dbOperator DBOperator

// SetDBOperator はパッケージ変数dbOperatorに値を代入する。
// これは初期化処理時に1度のみ呼び出す。
func SetDBOperator(db DBOperator) {
	dbOperator = db
}

//type dbOperatorMock struct{}
//
//func (o *dbOperatorMock) CreateUser(_ context.Context, _ string) (*User, error) {
//	return &User{
//		ID:        1,
//		DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
//		RestCount: 0,
//		CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//		UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//	}, nil
//}
//
//func (o *dbOperatorMock) GetUser(_ context.Context, _ string) (*User, error) {
//	return &User{
//		ID:        1,
//		DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
//		RestCount: 0,
//		CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//		UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//	}, nil
//}
//
//func (o *dbOperatorMock) CreateTask(_ context.Context, _ int, _ string, _ int, _ *time.Time) (*Task, error) {
//	dueOn := time.Date(2021, 7, 10, 0, 0, 0, 0, time.UTC)
//	return &Task{
//		ID:               1,
//		UserID:           1,
//		Title:            "タスク1",
//		EstimatedPomoNum: 4,
//		DueOn:            &dueOn,
//		CompletedOn:      nil,
//		CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//		UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//	}, nil
//}
//
//func (o *dbOperatorMock) GetTask(_ context.Context, _ int) (*Task, error) {
//	dueOn := time.Date(2021, 7, 10, 0, 0, 0, 0, time.UTC)
//	return &Task{
//		ID:               1,
//		UserID:           1,
//		Title:            "タスク1",
//		EstimatedPomoNum: 4,
//		DueOn:            &dueOn,
//		CompletedOn:      nil,
//		CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//		UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//	}, nil
//}
//
//func (o *dbOperatorMock) GetTasks(_ context.Context, _ int, _ *GetTasksRequest) ([]*Task, error) {
//	dueOn := time.Date(2021, 7, 10, 0, 0, 0, 0, time.UTC)
//	return []*Task{
//		{
//			ID:               1,
//			UserID:           1,
//			Title:            "タスク1",
//			EstimatedPomoNum: 4,
//			DueOn:            &dueOn,
//			CompletedOn:      nil,
//			CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//			UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
//		},
//		{
//			ID:               2,
//			UserID:           1,
//			Title:            "タスク2",
//			EstimatedPomoNum: 0,
//			DueOn:            nil,
//			CompletedOn:      nil,
//			CreatedAt:        time.Date(2021, 7, 10, 0, 0, 0, 0, time.UTC),
//			UpdatedAt:        time.Date(2021, 7, 10, 0, 0, 0, 0, time.UTC),
//		},
//	}, nil
//}
//
//func (o *dbOperatorMock) UpdateTask(_ context.Context, _ *Task) error {
//	return nil
//}
//
//func (o *dbOperatorMock) DeleteTask(_ context.Context, _ int) error {
//	return nil
//}
