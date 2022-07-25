package mysql

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	tomeit "github.com/minguu42/tomeit/pkg"
)

// CreateTask はMySQLにtomeit.Taskを作成し、返す。
func (o *dbOperator) CreateTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*tomeit.Task, error) {
	createdAt := time.Now()
	q, _, err := o.dialect.Insert("tasks").Rows(
		tomeit.Task{
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

	result, err := o.db.ExecContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}
	tomeit.LogInfo(q)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &tomeit.Task{
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

// GetTask はMySQLからtomeit.Taskを取得し、返す。
func (o *dbOperator) GetTask(ctx context.Context, id int) (*tomeit.Task, error) {
	q, _, err := o.dialect.From("tasks").Select(&tomeit.Task{}).Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var t tomeit.Task
	if err := o.db.QueryRowContext(ctx, q).Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
		return nil, fmt.Errorf("failed to get task row. %w", err)
	}
	tomeit.LogInfo(q)

	return &t, nil
}

// GetTasks はMySQLからtomeit.Taskの一覧を取得し、返す。
func (o *dbOperator) GetTasks(ctx context.Context, userID int, opt *tomeit.GetTasksRequest) ([]*tomeit.Task, error) {
	ds := o.dialect.From("tasks").Select(&tomeit.Task{}).Where(goqu.Ex{"user_id": userID})
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

	rows, err := o.db.QueryContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec select sql. %w", err)
	}
	defer rows.Close()
	tomeit.LogInfo(q)

	tasks := make([]*tomeit.Task, 0, 30)
	for rows.Next() {
		var t tomeit.Task
		if err := rows.Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
			return nil, fmt.Errorf("failed to scan row. %w", err)
		}
		tasks = append(tasks, &t)
	}

	return tasks, nil
}

// UpdateTask はMySQLのtomeit.Taskを更新する。
func (o *dbOperator) UpdateTask(ctx context.Context, task *tomeit.Task) error {
	q, _, err := o.dialect.Update("tasks").Set(task).Where(goqu.Ex{"id": task.ID}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create update sql. %w", err)
	}

	if _, err := o.db.ExecContext(ctx, q); err != nil {
		return fmt.Errorf("failed to exec update sql. %w", err)
	}
	tomeit.LogInfo(q)
	return nil
}

// DeleteTask はMySQLのtomeit.Taskを削除する。
func (o *dbOperator) DeleteTask(ctx context.Context, id int) error {
	q, _, err := o.dialect.Delete("tasks").Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		return fmt.Errorf("failed to create delete sql. %w", err)
	}

	if _, err := o.db.ExecContext(ctx, q); err != nil {
		return fmt.Errorf("failed to exec delete sql. %w", err)
	}
	tomeit.LogInfo(q)
	return nil
}
