package tomeit

import (
	"time"
)

type taskDBInterface interface {
	createTask(userID int, title string, priority int, dueOn *time.Time) (*Task, error)
	getTaskByID(id int) (*Task, error)
	getTasksByUser(user *User, options *getTasksOptions) ([]Task, error)
	getActualPomodoroNumByID(id int) (int, error)
	updateTask(task *Task) error
	deleteTask(task *Task) error
}

func (db *DB) createTask(userID int, title string, expectedPomodoroNum int, dueOn *time.Time) (*Task, error) {
	// TODO: 要実装
	return nil, nil
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
