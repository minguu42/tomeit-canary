package model

import "time"

type (
	Task struct {
		ID               int        `db:"id"      goqu:"skipinsert,skipupdate"`
		UserID           int        `db:"user_id" goqu:"skipupdate"`
		Title            string     `db:"title"`
		EstimatedPomoNum int        `db:"estimated_pomo_num"`
		DueOn            *time.Time `db:"due_on"`
		CompletedOn      *time.Time `db:"completed_on" goqu:"skipinsert"`
		CreatedAt        time.Time  `db:"created_at"   goqu:"skipupdate"`
		UpdatedAt        time.Time  `db:"updated_at"   goqu:"skipupdate"`
	}

	CreateTaskRequest struct {
		Title            string `json:"title"`
		EstimatedPomoNum int    `json:"estimatedPomoNum"`
		DueOn            string `json:"dueOn"`
	}
	ReadTaskRequest struct {
		IsCompleted *bool
		CompletedOn *time.Time
	}
	UpdateTaskRequest struct {
		TaskID           int
		Title            string  `json:"title"`
		EstimatedPomoNum *int    `json:"estimatedPomoNum"`
		DueOn            *string `json:"dueOn"`
		CompletedOn      *string `json:"completedOn"`
	}
	DeleteTaskRequest struct {
		TaskID int
	}

	TaskResponse struct {
		ID               int       `json:"id"`
		Title            string    `json:"title"`
		EstimatedPomoNum int       `json:"estimatedPomoNum"`
		CompletedPomoNum int       `json:"completedPomoNum"`
		DueOn            string    `json:"dueOn"`
		CompletedOn      string    `json:"completedOn"`
		CreatedAt        time.Time `json:"createdAt"`
		UpdatedAt        time.Time `json:"updatedAt"`
	}
	TasksResponse struct {
		Tasks []*TaskResponse `json:"tasks"`
	}
)

// NewTaskResponse は Task から TaskResponse を生成する。
// TODO: CompletedPomoNum が適切な値になるように実装できていない。
func NewTaskResponse(t *Task) *TaskResponse {
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

	return &TaskResponse{
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

// NewTasksResponse は Task のスライスから TasksResponse を生成する。
func NewTasksResponse(ts []*Task) *TasksResponse {
	tasks := make([]*TaskResponse, 0, len(ts))
	for _, t := range ts {
		tasks = append(tasks, NewTaskResponse(t))
	}
	return &TasksResponse{Tasks: tasks}
}
