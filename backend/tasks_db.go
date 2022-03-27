package tomeit

import (
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/logger"
)

func (db *db) createTask(title string, estimatedPomoNum int, dueOn time.Time) (*task, error) {
	createdAt := time.Now()

	sql, _, err := db.dialect.Insert("tasks").Cols("title", "estimated_pomo_num", "due_on", "created_at", "updated_at").Vals(goqu.Vals{title, estimatedPomoNum, dueOn, createdAt, createdAt}).ToSQL()
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
		title:            title,
		estimatedPomoNum: estimatedPomoNum,
		dueOn:            dueOn,
		completedOn:      time.Time{},
		createdAt:        createdAt,
		updatedAt:        createdAt,
	}
	return &task, nil
}
