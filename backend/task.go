package tomeit

import "time"

type (
	task struct {
		id               int        `db:"id" goqu:"skipinsert"`
		userID           int        `db:"user_id"`
		title            string     `db:"title"`
		estimatedPomoNum int        `db:"estimated_pomo_num"`
		dueOn            *time.Time `db:"due_on"`
		completedOn      *time.Time `db:"completed_on"`
		createdAt        time.Time  `db:"created_at"`
		updatedAt        time.Time  `db:"updated_at"`
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
	if t.dueOn != nil {
		dueOn = t.dueOn.Format(time.RFC3339)
	}
	completedOn := ""
	if t.completedOn != nil {
		completedOn = t.completedOn.Format(time.RFC3339)
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

// newTasksResponse は task のスライスで tasksResponse を初期化する。
func newTasksResponse(ts []*task) *tasksResponse {
	tasks := make([]*taskResponse, 0, len(ts))
	for _, t := range ts {
		task := newTaskResponse(t)
		tasks = append(tasks, task)
	}
	return &tasksResponse{Tasks: tasks}
}
