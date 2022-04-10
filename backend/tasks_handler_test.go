package tomeit

import (
	"net/http"
	"strings"
	"testing"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
)

var opt = cmpopts.IgnoreTypes(time.Time{})

func TestPostTasks(t *testing.T) {
	var (
		method = http.MethodPost
		path   = "/v0/tasks"
		got    taskResponse
	)
	setupTestDB(t)
	t.Cleanup(teardownTestDB)
	t.Run("タスクを作成する（title）", func(t *testing.T) {
		reqBody := strings.NewReader(`{"title": "タスク1"}`)
		resp, err := doTestRequest(method, path, nil, reqBody, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusCreated {
			t.Errorf("Status code should be %v, but %v", http.StatusCreated, resp.StatusCode)
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
		reqBody := strings.NewReader(`
{
  "title": "タスク2",
  "estimatedPomoNum": 4,
  "dueOn": "2022-01-02T21:22:23Z"
}
`)
		resp, err := doTestRequest(method, path, nil, reqBody, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusCreated {
			t.Errorf("Status code should be %v, but %v", http.StatusCreated, resp.StatusCode)
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
		reqBody := strings.NewReader(`
{
  "estimatedPomoNum": 4,
  "dueOn": "2022-01-02T21:22:23Z"
}
`)
		resp, err := doTestRequest(method, path, nil, reqBody, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
	t.Run("タスクの作成に失敗する（dueOn の形式が RFC3339 でない）", func(t *testing.T) {
		reqBody := strings.NewReader(`
{
  "title": "タスク3",
  "dueOn": "2022-01-02"
}
	`)
		resp, err := doTestRequest(method, path, nil, reqBody, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
}

func setupTestGetTasks(tb testing.TB) {
	dueOn, _ := time.Parse(time.RFC3339, "2022-01-01T15:04:05Z")
	completedOn, _ := time.Parse(time.RFC3339, "2022-01-02T15:04:05Z")
	sql, _, err := goqu.Dialect("mysql").Insert("tasks").
		Cols("id", "user_id", "title", "estimated_pomo_num", "due_on", "completed_on").
		Vals(
			goqu.Vals{1, 1, "タスク1", 0, nil, nil},
			goqu.Vals{2, 1, "タスク2", 4, nil, nil},
			goqu.Vals{3, 1, "タスク3", 0, dueOn, nil},
			goqu.Vals{4, 1, "タスク4", 0, nil, completedOn},
			goqu.Vals{5, 1, "タスク5", 4, dueOn, nil},
			goqu.Vals{6, 1, "タスク6", 4, nil, completedOn},
			goqu.Vals{7, 1, "タスク7", 0, dueOn, completedOn},
			goqu.Vals{8, 1, "タスク8", 4, dueOn, completedOn},
			goqu.Vals{9, 2, "タスク9", 0, nil, nil},
			goqu.Vals{10, 2, "タスク10", 4, nil, nil},
			goqu.Vals{11, 2, "タスク11", 0, dueOn, nil},
			goqu.Vals{12, 2, "タスク12", 0, nil, completedOn},
			goqu.Vals{13, 2, "タスク13", 4, dueOn, nil},
			goqu.Vals{14, 2, "タスク14", 4, nil, completedOn},
			goqu.Vals{15, 2, "タスク15", 0, dueOn, completedOn},
			goqu.Vals{16, 2, "タスク16", 4, dueOn, completedOn},
		).ToSQL()
	if err != nil {
		tb.Fatalf("ds.ToSQL failed: %v", err)
	}

	_, err = db.Exec(sql)
	if err != nil {
		tb.Fatalf("db.Exec failed: %v", err)
	}
}

func TestGetTasks(t *testing.T) {
	var (
		method = http.MethodGet
		path   = "/v0/tasks"
		got    tasksResponse
	)
	setupTestDB(t)
	setupTestGetTasks(t)
	t.Cleanup(teardownTestDB)
	t.Run("タスクの一覧を取得する", func(t *testing.T) {
		resp, err := doTestRequest(method, path, nil, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Status code should be %v, but %v", http.StatusOK, resp.StatusCode)
		}

		want := tasksResponse{Tasks: []*taskResponse{
			{
				ID:               1,
				Title:            "タスク1",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "",
			},
			{
				ID:               2,
				Title:            "タスク2",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "",
			},
			{
				ID:               3,
				Title:            "タスク3",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "",
			},
			{
				ID:               4,
				Title:            "タスク4",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
			},
			{
				ID:               5,
				Title:            "タスク5",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "",
			},
			{
				ID:               6,
				Title:            "タスク6",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
			},
			{
				ID:               7,
				Title:            "タスク7",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
			},
			{
				ID:               8,
				Title:            "タスク8",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
			},
		}}
		if diff := cmp.Diff(got, want, opt); diff != "" {
			t.Errorf("getTasks response mismatch (-got +want):\n%s", diff)
		}
	})
	t.Run("完了済みタスクの一覧を取得する", func(t *testing.T) {
		params := map[string]string{
			"isCompleted": "true",
		}
		resp, err := doTestRequest(method, path, params, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Status code should be %v, but %v", http.StatusOK, resp.StatusCode)
		}

		want := tasksResponse{Tasks: []*taskResponse{
			{
				ID:               4,
				Title:            "タスク4",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               6,
				Title:            "タスク6",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               7,
				Title:            "タスク7",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               8,
				Title:            "タスク8",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
		}}
		if diff := cmp.Diff(got, want, opt); diff != "" {
			t.Errorf("getTasks response mismatch (-got +want):\n%s", diff)
		}
	})
	t.Run("特定の日に完了したタスクの一覧を取得する", func(t *testing.T) {
		params := map[string]string{
			"completedOn": "2022-01-02T00:00:00Z",
		}
		resp, err := doTestRequest(method, path, params, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Status code should be %v, but %v", http.StatusOK, resp.StatusCode)
		}

		want := tasksResponse{Tasks: []*taskResponse{
			{
				ID:               4,
				Title:            "タスク4",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               6,
				Title:            "タスク6",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               7,
				Title:            "タスク7",
				EstimatedPomoNum: 0,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
			{
				ID:               8,
				Title:            "タスク8",
				EstimatedPomoNum: 4,
				CompletedPomoNum: 0,
				DueOn:            "2022-01-01T15:04:05Z",
				CompletedOn:      "2022-01-02T15:04:05Z",
				CreatedAt:        time.Time{},
				UpdatedAt:        time.Time{},
			},
		}}
		if diff := cmp.Diff(got, want, opt); diff != "" {
			t.Errorf("getTasks response mismatch (-got +want):\n%s", diff)
		}
	})
	t.Run("isCompleted の値が間違っている", func(t *testing.T) {
		params := map[string]string{
			"isCompleted": "Wrong",
		}
		resp, err := doTestRequest(method, path, params, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
	t.Run("completedOn の値が間違っている", func(t *testing.T) {
		params := map[string]string{
			"completedOn": "2022-01-02",
		}
		resp, err := doTestRequest(method, path, params, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
}

func TestDeleteTask(t *testing.T) {
	var (
		method = http.MethodDelete
		path   = "/v0/tasks/"
	)
	setupTestDB(t)
	setupTestGetTasks(t)
	t.Cleanup(teardownTestDB)
	t.Run("タスク1を削除する", func(t *testing.T) {
		resp, err := doTestRequest(method, path+"1", nil, nil, nil)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusNoContent {
			t.Errorf("Status code should be %v, but %v", http.StatusNoContent, resp.StatusCode)
		}
	})
	t.Run("タスク ID が数字ではない", func(t *testing.T) {
		resp, err := doTestRequest(method, path+"壱", nil, nil, nil)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Status code should be %v, but %v", http.StatusBadRequest, resp.StatusCode)
		}
	})
	t.Run("指定したリソースへのアクセスが許可されていない", func(t *testing.T) {
		resp, err := doTestRequest(method, path+"9", nil, nil, nil)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusForbidden {
			t.Errorf("Status code should be %v, but %v", http.StatusForbidden, resp.StatusCode)
		}
	})
	t.Run("指定した ID のタスクが存在しない", func(t *testing.T) {
		resp, err := doTestRequest(method, path+"17", nil, nil, nil)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusNotFound {
			t.Errorf("Status code should be %v, but %v", http.StatusNotFound, resp.StatusCode)
		}
	})
}
