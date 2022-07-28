package tomeit

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/google/go-cmp/cmp"
)

func TestPostTasks(t *testing.T) {
	SetDBOperator(&dbOperatorMock{})

	type want struct {
		statusCode int
		location   string
		response   interface{}
	}
	testcases := []struct {
		name    string
		request postTaskRequest
		want    want
	}{
		{
			name: "新しいタスクを作成する",
			request: postTaskRequest{
				Title:            "数学の課題を終わらせる",
				EstimatedPomoNum: 4,
				DueOn:            "2021-07-10T00:00:00Z",
			},
			want: want{
				statusCode: 201,
				location:   "https://example.com/tasks/1",
				response: taskResponse{
					ID:               1,
					Title:            "数学の課題を終わらせる",
					EstimatedPomoNum: 4,
					CompletedPomoNum: 0,
					DueOn:            "2021-07-10T00:00:00Z",
					CompletedOn:      "",
					CreatedAt:        time.Date(2021, 7, 9, 16, 30, 9, 0, time.UTC),
					UpdatedAt:        time.Date(2021, 7, 9, 16, 30, 9, 0, time.UTC),
				},
			},
		},
		{
			name: "Titleフィールドは必須である",
			request: postTaskRequest{
				Title:            "",
				EstimatedPomoNum: 4,
				DueOn:            "2021-07-10T00:00:00Z",
			},
			want: want{statusCode: 400},
		},
		{
			name: "EstimatedPomoNumフィールドは0以上4以下の数値である",
			request: postTaskRequest{
				Title:            "数学の課題を終わらせる",
				EstimatedPomoNum: -1,
				DueOn:            "2021-07-10T00:00:00Z",
			},
			want: want{statusCode: 400},
		},
		{
			name: "EstimatedPomoNumフィールドは0以上4以下の数値である",
			request: postTaskRequest{
				Title:            "数学の課題を終わらせる",
				EstimatedPomoNum: 5,
				DueOn:            "2021-07-10T00:00:00Z",
			},
			want: want{statusCode: 400},
		},
		{
			name: "DueOnフィールドはRFC 3339 date-time形式である",
			request: postTaskRequest{
				Title:            "数学の課題を終わらせる",
				EstimatedPomoNum: 4,
				DueOn:            "2021-07-10",
			},
			want: want{statusCode: 400},
		},
	}

	for i, tc := range testcases {
		data, err := json.Marshal(tc.request)
		if err != nil {
			t.Fatalf("#%d: failed to encode request. %v", i+1, err)
		}
		w := httptest.NewRecorder()
		r := httptest.NewRequest("POST", "/tasks", bytes.NewReader(data))
		r = r.WithContext(context.WithValue(r.Context(), userKey{},
			&user{
				ID:        1,
				DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
				RestCount: 0,
				CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
				UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
			}))

		PostTasks(w, r)

		resp := w.Result()
		if resp.StatusCode != tc.want.statusCode {
			t.Errorf("#%d: Response status code should be %d, but %d", i+1, tc.want.statusCode, resp.StatusCode)
		}
		if resp.StatusCode == 201 {
			if location := w.Header().Get("Location"); location != tc.want.location {
				t.Errorf("#%d: Response header 'Location' should be %v, but %v", i+1, tc.want.location, location)
			}

			var got taskResponse
			if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
				t.Fatalf("#%d: failed to decode response body. %v", i+1, err)
			}
			if diff := cmp.Diff(tc.want.response, got); diff != "" {
				t.Errorf("#%d: Response body is mismatch (-want +got):\n%s", i+1, diff)
			}
		}
	}
}

func TestGetTasks(t *testing.T) {
	SetDBOperator(&dbOperatorMock{})

	type want struct {
		statusCode int
		response   interface{}
	}
	testcases := []struct {
		name   string
		target string
		want   want
	}{
		{
			name:   "タスク一覧を取得する",
			target: "/tasks",
			want: want{
				statusCode: 200,
				response: tasksResponse{Tasks: []*taskResponse{
					{
						ID:               1,
						Title:            "数学の課題を終わらせる",
						EstimatedPomoNum: 4,
						CompletedPomoNum: 0,
						DueOn:            "2021-07-10T00:00:00Z",
						CompletedOn:      "",
						CreatedAt:        time.Date(2021, 7, 9, 16, 30, 9, 0, time.UTC),
						UpdatedAt:        time.Date(2021, 7, 9, 16, 30, 9, 0, time.UTC),
					},
					{
						ID:               2,
						Title:            "録画しておいた映画を観る",
						EstimatedPomoNum: 0,
						CompletedPomoNum: 0,
						DueOn:            "",
						CompletedOn:      "",
						CreatedAt:        time.Date(2021, 7, 10, 21, 0, 49, 0, time.UTC),
						UpdatedAt:        time.Date(2021, 7, 10, 21, 0, 49, 0, time.UTC),
					},
				}},
			},
		},
		{
			name:   "クエリパラメータisCompletedは真偽値である",
			target: "/tasks?isCompleted=真",
			want:   want{statusCode: 400},
		},
		{
			name:   "クエリパラメータcompletedOnはRFC 3339 date-time形式である",
			target: "/tasks?completedOn=2021-07-10",
			want:   want{statusCode: 400},
		},
	}

	for i, tc := range testcases {
		w := httptest.NewRecorder()
		r := httptest.NewRequest("GET", tc.target, nil)
		r = r.WithContext(context.WithValue(r.Context(), userKey{},
			&user{
				ID:        1,
				DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
				RestCount: 0,
				CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
				UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
			}))

		GetTasks(w, r)

		resp := w.Result()
		if resp.StatusCode != tc.want.statusCode {
			t.Errorf("#%d: Response status code should be %d, but %d", i+1, tc.want.statusCode, resp.StatusCode)
		}
		if resp.StatusCode == 200 {
			var got tasksResponse
			if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
				t.Fatalf("#%d: failed to decode response body. %v", i+1, err)
			}
			if diff := cmp.Diff(tc.want.response, got); diff != "" {
				t.Errorf("#%d: Response body is mismatch (-want +got):\n%s", i+1, diff)
			}
		}
	}
}

func TestPatchTask(t *testing.T) {
	SetDBOperator(&dbOperatorMock{})

	type want struct {
		statusCode int
	}
	var (
		estimatedPomoNum = 2
		dueOn            = "2021-07-11T00:00:00Z"
		badDueOn         = "2021-07-11"
		completedOn      = "2021-07-12T00:00:00Z"
		badCompletedOn   = "2021-07-12"
	)
	testcases := []struct {
		name    string
		request patchTaskRequest
		want    want
	}{
		{
			name: "タスクを更新する",
			request: patchTaskRequest{
				Title:            "",
				EstimatedPomoNum: &estimatedPomoNum,
				DueOn:            &dueOn,
				CompletedOn:      &completedOn,
			},
			want: want{statusCode: 200},
		},
		{
			name:    "DueOnフィールドはRFC 3339 date-time形式である",
			request: patchTaskRequest{DueOn: &badDueOn},
			want:    want{statusCode: 400},
		},
		{
			name:    "CompletedOnフィールドはRFC 3339 date-time形式である",
			request: patchTaskRequest{CompletedOn: &badCompletedOn},
			want:    want{statusCode: 400},
		},
	}

	for i, tc := range testcases {
		data, err := json.Marshal(tc.request)
		if err != nil {
			t.Fatalf("#%d: failed to encode request. %v", i+1, err)
		}
		w := httptest.NewRecorder()
		r := httptest.NewRequest("PATCH", "/tasks/1", bytes.NewReader(data))
		r = r.WithContext(context.WithValue(r.Context(), chi.RouteCtxKey,
			&chi.Context{URLParams: chi.RouteParams{
				Keys:   []string{"taskID"},
				Values: []string{"1"},
			}}))
		r = r.WithContext(context.WithValue(r.Context(), userKey{},
			&user{
				ID:        1,
				DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
				RestCount: 0,
				CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
				UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
			}))

		PatchTask(w, r)

		resp := w.Result()
		if resp.StatusCode != tc.want.statusCode {
			t.Errorf("#%d: Response status code should be %d, but %d", i+1, tc.want.statusCode, resp.StatusCode)
		}
	}
}

func TestDeleteTask(t *testing.T) {
	SetDBOperator(&dbOperatorMock{})

	type want struct {
		statusCode int
	}
	testcases := []struct {
		name string
		want want
	}{
		{
			name: "タスクを削除する",
			want: want{statusCode: 204},
		},
	}

	for i, tc := range testcases {
		w := httptest.NewRecorder()
		r := httptest.NewRequest("DELETE", "/tasks/1", nil)
		r = r.WithContext(context.WithValue(r.Context(), chi.RouteCtxKey,
			&chi.Context{URLParams: chi.RouteParams{
				Keys:   []string{"taskID"},
				Values: []string{"1"},
			}}))
		r = r.WithContext(context.WithValue(r.Context(), userKey{},
			&user{
				ID:        1,
				DigestUID: "a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a",
				RestCount: 0,
				CreatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
				UpdatedAt: time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
			}))

		DeleteTask(w, r)

		resp := w.Result()
		if resp.StatusCode != tc.want.statusCode {
			t.Errorf("#%d: Response status code should be %d, but %d", i+1, tc.want.statusCode, resp.StatusCode)
		}
	}
}
