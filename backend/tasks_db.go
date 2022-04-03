package tomeit

import (
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/logger"
)

func (db *db) createTask(user *User, title string, estimatedPomoNum int, dueOn *time.Time) (*task, error) {
	createdAt := time.Now()

	sql, _, err := db.dialect.Insert("tasks").Cols("title", "user_id", "estimated_pomo_num", "due_on", "created_at", "updated_at").Vals(goqu.Vals{title, user.ID, estimatedPomoNum, dueOn, createdAt, createdAt}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}
	result, err := db.db.Exec(sql)
	if err != nil {
		return nil, fmt.Errorf("Database.Exec failed: %w", err)
	}
	logger.Debug.Println(sql)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("result.LastInsertId failed: %w", err)
	}

	task := task{
		id:               int(id),
		user:             user,
		title:            title,
		estimatedPomoNum: estimatedPomoNum,
		dueOn:            dueOn,
		completedOn:      nil,
		createdAt:        createdAt,
		updatedAt:        createdAt,
	}
	return &task, nil
}

func (db *db) getTasksByUserID(user *User, opt *getTasksRequest) ([]*task, error) {
	ds := db.dialect.From("tasks").Select(&task{}).Where(goqu.Ex{"user_id": user.ID})
	if opt.isCompleted != nil {
		if *opt.isCompleted {
			ds = ds.Where(goqu.C("completed_on").IsNotNull())
		} else {
			ds = ds.Where(goqu.C("completed_on").IsNull())
		}
	}
	if opt.completedOn != nil {
		ds = ds.Where(goqu.Ex{"completed_on": *opt.completedOn})
	}
	sql, _, err := ds.ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	rows, err := db.db.Query(sql)
	if err != nil {
		return nil, fmt.Errorf("db.Query failed: %w", err)
	}
	defer rows.Close()

	tasks := make([]*task, 0, 30)
	for rows.Next() {
		var task task
		if err := rows.Scan(&task.id, &task.userID, &task.title, &task.estimatedPomoNum, &task.dueOn, &task.completedOn, &task.createdAt, &task.updatedAt); err != nil {
			return nil, fmt.Errorf("rows.Scan failed: %w", err)
		}
		tasks = append(tasks, &task)
	}

	return tasks, nil
}
