package tomeit

import (
	"net/http"
	"strings"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
)

var opt = cmpopts.IgnoreTypes(time.Time{})

func TestPostTasks(t *testing.T) {
	setupTestDB(t)
	t.Cleanup(teardownTestDB)
	t.Run("タスクを作成する（title）", func(t *testing.T) {
		reqBody := strings.NewReader(`{"title": "タスク1"}`)
		resp, body := doTestRequest(t, "POST", "/v0/tasks", nil, reqBody, "taskResponse")

		if resp.StatusCode != http.StatusCreated {
			t.Errorf("Status code should be %v, but %v", http.StatusCreated, resp.StatusCode)
		}

		got, ok := body.(taskResponse)
		if !ok {
			t.Fatal("Type Assertion failed.")
		}
		want := taskResponse{
			ID:               1,
			Title:            "タスク1",
			EstimatedPomoNum: 0,
			CompletedPomoNum: 0,
			DueOn:            "",
			CompletedOn:      "",
		}
		if diff := cmp.Diff(got, want, opt); diff != "" {
			t.Errorf("postTasks response mismatch (-got +want):\n%s", diff)
		}
	})
	t.Run("タスクを作成する（title, estimatedPomoNum, dueOn）", func(t *testing.T) {
		reqBody := strings.NewReader(`{"title": "タスク2", "estimatedPomoNum": 4, "dueOn": "2022-01-02T21:22:23Z"}`)
		resp, body := doTestRequest(t, "POST", "/v0/tasks", nil, reqBody, "taskResponse")

		if resp.StatusCode != http.StatusCreated {
			t.Errorf("Status code should be %v, but %v", http.StatusCreated, resp.StatusCode)
		}

		got, ok := body.(taskResponse)
		if !ok {
			t.Fatal("Type Assertion failed.")
		}
		want := taskResponse{
			ID:               2,
			Title:            "タスク2",
			EstimatedPomoNum: 4,
			CompletedPomoNum: 0,
			DueOn:            "2022-01-02T21:22:23Z",
			CompletedOn:      "",
		}
		if diff := cmp.Diff(got, want, opt); diff != "" {
			t.Errorf("postTasks response mismatch (-got +want):\n%s", diff)
		}
	})
	t.Run("タスクの作成に失敗する（title がない）", func(t *testing.T) {
		reqBody := strings.NewReader(`{"estimatedPomoNum": 4, "dueOn": "2022-01-02T21:22:23Z"}`)
		resp, _ := doTestRequest(t, "POST", "/v0/tasks", nil, reqBody, "taskResponse")

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
	t.Run("タスクの作成に失敗する（dueOn の形式が RFC3339 でない）", func(t *testing.T) {
		reqBody := strings.NewReader(`{"title": "タスク3", "dueOn": "2022-01-02"}`)
		resp, _ := doTestRequest(t, "POST", "/v0/tasks", nil, reqBody, "taskResponse")

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
}
