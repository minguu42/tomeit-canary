package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/minguu42/tomeit/handler/middleware"
	"github.com/minguu42/tomeit/model"
	"github.com/minguu42/tomeit/service"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
	"time"
)

func TestCreateTask(t *testing.T) {
	req := model.CreateTaskRequest{
		Title:            "タスク1",
		EstimatedPomoNum: 4,
		DueOn:            "",
	}
	data, err := json.Marshal(req)
	if err != nil {
		t.Fatalf("failed to marshal CreateTaskRequest. %v", err)
	}
	w := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodPost, "/tasks", bytes.NewReader(data))
	r = r.WithContext(context.WithValue(r.Context(), middleware.UserKey{}, &model.User{}))

	h := New(&service.Mock{})
	h.CreateTask(w, r)

	resp := w.Result()
	if resp.StatusCode != http.StatusCreated {
		t.Errorf("got = %v, want = %v", resp.StatusCode, http.StatusCreated)
	}

	var got model.TaskResponse
	if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
		t.Fatalf("failed to decode response body. %v", err)
	}
	want := model.TaskResponse{
		ID:               1,
		Title:            "タスク1",
		EstimatedPomoNum: 4,
		CompletedPomoNum: 0,
		DueOn:            "",
		CompletedOn:      "",
		CreatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
		UpdatedAt:        time.Date(2021, 7, 9, 0, 0, 0, 0, time.Local),
	}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got = %v, want = %v", got, want)
	}
}
