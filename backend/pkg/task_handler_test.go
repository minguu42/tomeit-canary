package tomeit

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

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
