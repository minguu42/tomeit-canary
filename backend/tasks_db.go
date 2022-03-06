package tomeit

import (
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
)

type taskDBInterface interface {
	createTask(userID int, title string, expectedPomodoroNum int, dueOn time.Time) (*Task, error)
	getTaskByID(id int) (*Task, error)
	getTasksByUser(user *User, options *getTasksOptions) ([]Task, error)
	getActualPomodoroNumByID(id int) (int, error)
	updateTask(task *Task) error
	deleteTask(task *Task) error
}

func (db *DB) createTask(userID int, title string, expectedPomodoroNum int, dueOn time.Time) (*Task, error) {
	now := time.Now()
	sql, _, err := db.dialect.Insert("tasks").
		Cols("user_id", "title", "expected_pomodoro_num", "due_on", "created_at", "updated_at").
		Vals(goqu.Vals{userID, title, expectedPomodoroNum, dueOn, now, now}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	result, err := db.db.Exec(sql)
	if err != nil {
		return nil, fmt.Errorf("db.Exec failed: %w", err)
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("result.LastInsertId failed: %w", err)
	}

	t := Task{
		ID:                  int(id),
		UserID:              userID,
		User:                nil,
		Title:               title,
		ExpectedPomodoroNum: expectedPomodoroNum,
		DueOn:               dueOn,
		IsCompleted:         false,
		CompletedOn:         time.Time{},
		CreatedAt:           now,
		UpdatedAt:           now,
	}
	return &t, nil
}

func (db *DB) getTaskByID(id int) (*Task, error) {
	// TODO: 要実装
	return nil, nil
}

type getTasksOptions struct {
	isCompletedExists bool
	isCompleted       bool
	completedOnExists bool
	completedOn       time.Time
}

func (db *DB) getTasksByUser(user *User, options *getTasksOptions) ([]Task, error) {
	// TODO: 要実装
	return nil, nil
}

func (db *DB) getActualPomodoroNumByID(id int) (int, error) {
	// TODO: 要実装
	return 0, nil
}

func (db *DB) updateTask(task *Task) error {
	// TODO: 要実装
	return nil
}

func (db *DB) deleteTask(task *Task) error {
	// TODO: 要実装
	return nil
}
