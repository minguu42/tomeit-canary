package tomeit

import "time"

type (
	task struct {
		id               int
		user             *User
		title            string
		estimatedPomoNum int
		dueOn            time.Time
		completedOn      time.Time
		createdAt        time.Time
		updatedAt        time.Time
	}

	postTasksRequest struct {
		Title            string `json:"title"`
		EstimatedPomoNum int    `json:"estimatedPomoNum"`
		DueOn            string `json:"dueOn"`
	}

	taskResponse struct {
		ID               int       `json:"id"`
		Title            string    `json:"title"`
		EstimatedPomoNum int       `json:"estimatedPomoNum"`
		CompletedPomoNum int       `json:"completedPomoNum"`
		DueOn            string    `json:"dueOn"`
		CompletedOn      string    `json:"completedOn"`
		CreatedAt        time.Time `json:"createdAt"`
		UpdatedAt        time.Time `json:"updatedAt"`
	}
)

// newTaskResponse は task で taskResponse を初期化する。
// TODO: CompletedPomoNum が適切な値になるように実装する
func newTaskResponse(t *task) *taskResponse {
	dueOn := t.dueOn.Format(time.RFC3339)
	if t.dueOn.IsZero() {
		dueOn = ""
	}
	completedOn := t.dueOn.Format(time.RFC3339)
	if t.completedOn.IsZero() {
		completedOn = ""
	}

	return &taskResponse{
		ID:               t.id,
		Title:            t.title,
		EstimatedPomoNum: t.estimatedPomoNum,
		CompletedPomoNum: 0,
		DueOn:            dueOn,
		CompletedOn:      completedOn,
		CreatedAt:        t.createdAt,
		UpdatedAt:        t.updatedAt,
	}
}
