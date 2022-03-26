package tomeit

import "time"

type (
	Task struct {
		ID                  int
		UserID              int
		User                *User
		Title               string
		ExpectedPomodoroNum int
		DueOn               time.Time
		IsCompleted         bool
		CompletedOn         time.Time
		CreatedAt           time.Time
		UpdatedAt           time.Time
	}

	postTasksRequest struct {
		Title               string `json:"title"`
		ExpectedPomodoroNum int    `json:"expectedPomodoroNum,omitempty"`
		DueOn               string `json:"dueOn,omitempty"`
	}

	taskResponse struct {
		ID                  int    `json:"id"`
		Title               string `json:"title"`
		ExpectedPomodoroNum int    `json:"expectedPomodoroNum"`
		ActualPomodoroNum   int    `json:"actualPomodoroNum"`
		DueOn               string `json:"dueOn"`
		IsCompleted         bool   `json:"isCompleted"`
		CompletedOn         string `json:"completedOn"`
		CreatedAt           string `json:"createdAt"`
		UpdatedAt           string `json:"updatedAt"`
	}
	tasksResponse struct {
		Tasks []*taskResponse `json:"tasks"`
	}
)

func newTaskResponse(t *Task, _ dbInterface) *taskResponse {
	// TODO: actualPomodoroNum の正しい値を取得する
	dueOn := ""
	if !t.DueOn.IsZero() {
		dueOn = t.DueOn.Format(time.RFC3339)
	}
	completedOn := ""
	if !t.CompletedOn.IsZero() {
		completedOn = t.CompletedOn.Format(time.RFC3339)
	}

	r := taskResponse{
		ID:                  t.ID,
		Title:               t.Title,
		ExpectedPomodoroNum: t.ExpectedPomodoroNum,
		ActualPomodoroNum:   0,
		DueOn:               dueOn,
		IsCompleted:         t.IsCompleted,
		CompletedOn:         completedOn,
		CreatedAt:           t.CreatedAt.Format(time.RFC3339),
		UpdatedAt:           t.UpdatedAt.Format(time.RFC3339),
	}
	return &r
}
