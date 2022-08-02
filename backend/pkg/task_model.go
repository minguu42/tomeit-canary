package tomeit

import "time"

type (
	task struct {
		ID               int        `db:"id"      goqu:"skipinsert,skipupdate"`
		UserID           int        `db:"user_id" goqu:"skipupdate"`
		Title            string     `db:"title"`
		EstimatedPomoNum int        `db:"estimated_pomo_num"`
		DueOn            *time.Time `db:"due_on"`
		CompletedOn      *time.Time `db:"completed_on" goqu:"skipinsert"`
		CreatedAt        time.Time  `db:"created_at"   goqu:"skipupdate"`
		UpdatedAt        time.Time  `db:"updated_at"   goqu:"skipupdate"`
	}

	createTaskRequest struct {
		Title            string `json:"title"`
		EstimatedPomoNum int    `json:"estimatedPomoNum"`
		DueOn            string `json:"dueOn"`
	}
	getTasksRequest struct {
		IsCompleted *bool      `json:"-"`
		CompletedOn *time.Time `json:"-"`
	}
	patchTaskRequest struct {
		TaskID           int     `json:"-"`
		Title            string  `json:"title"`
		EstimatedPomoNum *int    `json:"estimatedPomoNum"`
		DueOn            *string `json:"dueOn"`
		CompletedOn      *string `json:"completedOn"`
	}
	deleteTaskRequest struct {
		TaskID int `json:"-"`
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

// newTaskResponse はTaskからtaskResponseを生成する。
// TODO: CompletedPomoNumが適切な値になるように実装していない。
func newTaskResponse(t *task) *taskResponse {
	var (
		dueOn       = ""
		completedOn = ""
	)
	if t.DueOn != nil {
		dueOn = t.DueOn.Format(time.RFC3339)
	}
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

// newTasksResponse はTaskのスライスからtasksResponseを生成する。
func newTasksResponse(ts []*task) *tasksResponse {
	tasks := make([]*taskResponse, 0, len(ts))
	for _, t := range ts {
		tasks = append(tasks, newTaskResponse(t))
	}
	return &tasksResponse{Tasks: tasks}
}
