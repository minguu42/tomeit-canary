package tomeit

import "time"

type (
	task struct {
		ID               int        `db:"ID" goqu:"skipinsert"`
		UserID           int        `db:"user_id"`
		Title            string     `db:"Title"`
		EstimatedPomoNum int        `db:"estimated_pomo_num"`
		DueOn            *time.Time `db:"due_on"`
		CompletedOn      *time.Time `db:"completed_on" goqu:"skipinsert"`
		CreatedAt        time.Time  `db:"created_at"`
		UpdatedAt        time.Time  `db:"updated_at"`
	}

	postTasksRequest struct {
		Title            string `json:"title"`
		EstimatedPomoNum int    `json:"estimatedPomoNum"`
		DueOn            string `json:"dueOn"`
	}
	getTasksRequest struct {
		isCompleted *bool
		completedOn *time.Time
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
	tasksResponse struct {
		Tasks []*taskResponse `json:"tasks"`
	}
)

// newTaskResponse は task で taskResponse を初期化する。
// TODO: CompletedPomoNum が適切な値になるように実装する
func newTaskResponse(t *task) *taskResponse {
	dueOn := ""
	if t.DueOn != nil {
		dueOn = t.DueOn.Format(time.RFC3339)
	}
	completedOn := ""
	if t.CompletedOn != nil {
		completedOn = t.CompletedOn.Format(time.RFC3339)
	}

	return &taskResponse{
		ID:               t.ID,
		Title:            t.Title,
		EstimatedPomoNum: t.EstimatedPomoNum,
		CompletedPomoNum: 0,
		DueOn:            dueOn,
		CompletedOn:      completedOn,
		CreatedAt:        t.CreatedAt,
		UpdatedAt:        t.UpdatedAt,
	}
}

// newTasksResponse は task のスライスで tasksResponse を初期化する。
func newTasksResponse(ts []*task) *tasksResponse {
	tasks := make([]*taskResponse, 0, len(ts))
	for _, t := range ts {
		task := newTaskResponse(t)
		tasks = append(tasks, task)
	}
	return &tasksResponse{Tasks: tasks}
}
