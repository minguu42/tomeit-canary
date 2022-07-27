package tomeit

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
)

// CreateTask はDBにタスクを作成し、返す。
func (m *mysql) CreateTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*Task, error) {
	createdAt := time.Now()
	q, _, err := m.dialect.Insert("tasks").Rows(
		Task{
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

	result, err := m.db.ExecContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}
	LogInfo(q)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &Task{
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

// GetTask はDBからタスクを取得し、返す。
func (m *mysql) GetTask(ctx context.Context, id int) (*Task, error) {
	q, _, err := m.dialect.From("tasks").Select(&Task{}).Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var t Task
	if err := m.db.QueryRowContext(ctx, q).Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
		return nil, fmt.Errorf("failed to get task row. %w", err)
	}
	LogInfo(q)

	return &t, nil
}

// GetTasks はDBからタスク一覧を取得し、返す。
func (m *mysql) GetTasks(ctx context.Context, userID int, opt *GetTasksRequest) ([]*Task, error) {
	ds := m.dialect.From("tasks").Select(&Task{}).Where(goqu.Ex{"user_id": userID})
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

	q, _, err := ds.ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	rows, err := m.db.QueryContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec select sql. %w", err)
	}
	defer rows.Close()
	LogInfo(q)

	tasks := make([]*Task, 0, 30)
	for rows.Next() {
		var t Task
		if err := rows.Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
			return nil, fmt.Errorf("failed to scan row. %w", err)
		}
		tasks = append(tasks, &t)
	}

	return tasks, nil
}

// UpdateTask はDBのタスクを更新する。
func (m *mysql) UpdateTask(ctx context.Context, task *Task) error {
	q, _, err := m.dialect.Update("tasks").Set(task).Where(goqu.Ex{"id": task.ID}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create update sql. %w", err)
	}

	if _, err := m.db.ExecContext(ctx, q); err != nil {
		return fmt.Errorf("failed to exec update sql. %w", err)
	}
	LogInfo(q)
	return nil
}

// DeleteTask はDBのタスクを削除する。
func (m *mysql) DeleteTask(ctx context.Context, id int) error {
	q, _, err := m.dialect.Delete("tasks").Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create delete sql. %w", err)
	}

	if _, err := m.db.ExecContext(ctx, q); err != nil {
		return fmt.Errorf("failed to exec delete sql. %w", err)
	}
	LogInfo(q)
	return nil
}
