package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/minguu42/tomeit/pkg/handler/middleware"
	"github.com/minguu42/tomeit/pkg/model"
	"github.com/minguu42/tomeit/pkg/service"
)

func TestCreateTask(t *testing.T) {
	type want struct {
		statusCode int
		location   string
		response   interface{}
	}
	testcases := []struct {
		request model.CreateTaskRequest
		want    want
	}{
		{
			request: model.CreateTaskRequest{Title: "タスク1", EstimatedPomoNum: 4, DueOn: "2021-07-10T00:00:00Z"},
			want: want{
				statusCode: 201,
				location:   "https://example.com/tasks/1",
				response: model.TaskResponse{
					ID:               1,
					Title:            "タスク1",
					EstimatedPomoNum: 4,
					CompletedPomoNum: 0,
					DueOn:            "2021-07-10T00:00:00Z",
					CompletedOn:      "",
					CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
					UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.UTC),
				},
			},
		},
		{
			request: model.CreateTaskRequest{Title: "", EstimatedPomoNum: 4, DueOn: "2021-07-10T00:00:00Z"},
			want:    want{statusCode: 400},
		},
		{
			request: model.CreateTaskRequest{Title: "タスク1", EstimatedPomoNum: -1, DueOn: "2021-07-10T00:00:00Z"},
			want:    want{statusCode: 400},
		},
		{
			request: model.CreateTaskRequest{Title: "タスク1", EstimatedPomoNum: 5, DueOn: "2021-07-10T00:00:00Z"},
			want:    want{statusCode: 400},
		},
		{
			request: model.CreateTaskRequest{Title: "タスク1", EstimatedPomoNum: 4, DueOn: "2021-07-10"},
			want:    want{statusCode: 400},
		},
	}

	for i, tc := range testcases {
		data, err := json.Marshal(tc.request)
		if err != nil {
			t.Fatalf("#%d: failed to encode request. %v", i+1, err)
		}
		w := httptest.NewRecorder()
		r := httptest.NewRequest("POST", "/tasks", bytes.NewReader(data))
		r = r.WithContext(context.WithValue(r.Context(), middleware.UserKey{}, &model.User{}))

		h := New(&service.Mock{})
		h.CreateTask(w, r)

		resp := w.Result()
		if resp.StatusCode != tc.want.statusCode {
			t.Errorf("#%d: got = %v, want = %v", i+1, resp.StatusCode, tc.want.statusCode)
		}

		if resp.StatusCode == 201 {
			if location := w.Header().Get("Location"); location != tc.want.location {
				t.Errorf("#%d: got = %v, want = %v", i+1, location, tc.want.location)
			}

			var got model.TaskResponse
			if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
				t.Fatalf("#%d: failed to decode response body. %v", i+1, err)
			}
			if diff := cmp.Diff(got, tc.want.response); diff != "" {
				t.Errorf("#%d: task reponse body is mismatch (-got +want):\n%s", i+1, diff)
			}
		}
	}
}
