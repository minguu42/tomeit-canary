package tomeit

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
)

// createTask は task を作成し、返す。
func createTask(ctx context.Context, userID int, title string, estimatedPomoNum int, dueOn *time.Time) (*task, error) {
	createdAt := time.Now()
	sql, _, err := dialect.Insert("tasks").Rows(
		task{
			UserID:           userID,
			Title:            title,
			EstimatedPomoNum: estimatedPomoNum,
			DueOn:            dueOn,
			CreatedAt:        createdAt,
			UpdatedAt:        createdAt,
		},
	).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	result, err := db.ExecContext(ctx, sql)
	if err != nil {
		return nil, fmt.Errorf("db.ExecContext failed: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("result.LastInsertId failed: %w", err)
	}

	return &task{
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

// getTasksByUserID は task の一覧を取得し、返す。
func getTasksByUserID(ctx context.Context, userID int, opt *getTasksRequest) ([]*task, error) {
	ds := dialect.From("tasks").Select(&task{}).Where(goqu.Ex{"user_id": userID})
	if opt.isCompleted != nil {
		if *opt.isCompleted {
			ds = ds.Where(goqu.C("completed_on").IsNotNull())
		} else {
			ds = ds.Where(goqu.C("completed_on").IsNull())
		}
	}
	if opt.completedOn != nil {
		start := time.Date(opt.completedOn.Year(), opt.completedOn.Month(), opt.completedOn.Day(), 0, 0, 0, 0, time.UTC)
		end := time.Date(opt.completedOn.Year(), opt.completedOn.Month(), opt.completedOn.Day(), 23, 59, 59, 0, time.UTC)
		ds = ds.Where(goqu.Ex{"completed_on": goqu.Op{"between": goqu.Range(start, end)}})
	}
	sql, _, err := ds.ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	rows, err := db.QueryContext(ctx, sql)
	if err != nil {
		return nil, fmt.Errorf("db.QueryContext failed: %w", err)
	}
	defer rows.Close()

	tasks := make([]*task, 0, 30)
	for rows.Next() {
		var t task
		if err := rows.Scan(&t.CompletedOn, &t.CreatedAt, &t.DueOn, &t.EstimatedPomoNum, &t.ID, &t.Title, &t.UpdatedAt, &t.UserID); err != nil {
			return nil, fmt.Errorf("rows.Scan failed: %w", err)
		}
		tasks = append(tasks, &t)
	}

	return tasks, nil
}

// deleteTaskByID は task を削除する。
func deleteTaskByID(ctx context.Context, taskID, userID int) error {
	sql, _, err := dialect.Delete("tasks").Where(goqu.Ex{
		"id":      taskID,
		"user_id": userID,
	}).ToSQL()
	if err != nil {
		return fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	if _, err := db.ExecContext(ctx, sql); err != nil {
		return fmt.Errorf("db.ExecContext failed: %v", err)
	}
	return nil
}
