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
