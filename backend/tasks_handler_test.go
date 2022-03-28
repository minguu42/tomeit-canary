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
	t.Run("タスクを作成する", func(t *testing.T) {
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
}
