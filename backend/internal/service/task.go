package service

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/internal/model"
)

// CreateTask は DB に model.Task を作成し、返す。
func (s *service) CreateTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*model.Task, error) {
	createdAt := time.Now()
	query, _, err := s.dialect.Insert("tasks").Rows(
		model.Task{
			UserID:           userID,
			Title:            title,
			EstimatedPomoNum: estimatedPomoNum,
			DueOn:            dueOn,
			CreatedAt:        createdAt,
			UpdatedAt:        createdAt,
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

	return &model.Task{
		ID:               int(id),
		UserID:           userID,
		Title:            title,
		EstimatedPomoNum: estimatedPomoNum,
		DueOn:            dueOn,
		CompletedOn:      nil,
		CreatedAt:        createdAt,
		UpdatedAt:        createdAt,
	}, nil
}

// GetTask は DB から model.Task を取得し、返す。
func (s *service) GetTask(ctx context.Context, id int) (*model.Task, error) {
	query, _, err := s.dialect.From("tasks").Select(&model.Task{}).Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var t model.Task
	if err := s.db.QueryRowContext(ctx, query).Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
		return nil, fmt.Errorf("failed to get task row. %w", err)
	}

	return &t, nil
}

// GetTasks は DB から model.Task の一覧を取得し、返す。
func (s *service) GetTasks(ctx context.Context, userID int, opt *model.ReadTaskRequest) ([]*model.Task, error) {
	ds := s.dialect.From("tasks").Select(&model.Task{}).Where(goqu.Ex{"user_id": userID})
	if opt.IsCompleted != nil {
		if *opt.IsCompleted {
			ds = ds.Where(goqu.C("completed_on").IsNotNull())
		} else {
			ds = ds.Where(goqu.C("completed_on").IsNull())
		}
	}
	if opt.CompletedOn != nil {
		start := time.Date(opt.CompletedOn.Year(), opt.CompletedOn.Month(), opt.CompletedOn.Day(), 0, 0, 0, 0, time.Local)
		end := time.Date(opt.CompletedOn.Year(), opt.CompletedOn.Month(), opt.CompletedOn.Day(), 23, 59, 59, 0, time.Local)
		ds = ds.Where(goqu.Ex{"completed_on": goqu.Op{"between": goqu.Range(start, end)}})
	}

	query, _, err := ds.ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	rows, err := s.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to exec select sql. %w", err)
	}
	defer rows.Close()

	tasks := make([]*model.Task, 0, 30)
	for rows.Next() {
		var t model.Task
		if err := rows.Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
			return nil, fmt.Errorf("failed to scan row. %w", err)
		}
		tasks = append(tasks, &t)
	}

	return tasks, nil
}

// UpdateTask は DB の model.Task を更新する。
func (s *service) UpdateTask(ctx context.Context, task *model.Task) error {
	query, _, err := s.dialect.Update("tasks").Set(task).Where(goqu.Ex{"id": task.ID}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create update sql. %w", err)
	}

	if _, err := s.db.ExecContext(ctx, query); err != nil {
		return fmt.Errorf("failed to exec update sql. %w", err)
	}
	return nil
}

// DeleteTask は DB の model.Task を削除する。
func (s *service) DeleteTask(ctx context.Context, id int) error {
	query, _, err := s.dialect.Delete("tasks").Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create delete sql. %w", err)
	}

	if _, err := s.db.ExecContext(ctx, query); err != nil {
		return fmt.Errorf("failed to exec delete sql. %w", err)
	}
	return nil
}
