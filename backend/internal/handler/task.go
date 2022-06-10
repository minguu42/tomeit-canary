package handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/minguu42/tomeit/internal/handler/middleware"
	"github.com/minguu42/tomeit/internal/model"
)

// CreateTask は POST /tasks エンドポイントに対応するハンドラ
func (h *Handler) CreateTask(w http.ResponseWriter, r *http.Request) {
	var req model.CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	if req.Title == "" {
		// TODO: エラーレスポンスの生成
		return
	}
	var dueOn *time.Time
	if req.DueOn != "" {
		tmpDueOn, err := time.Parse(time.RFC3339, req.DueOn)
		if err != nil {
			// TODO: エラーレスポンスの生成
			return
		}
		dueOn = &tmpDueOn
	}

	ctx := r.Context()
	user := ctx.Value(middleware.UserKey{}).(*model.User)

	task, err := h.svc.CreateTask(ctx, user.ID, req.Title, req.EstimatedPomoNum, dueOn)
	if err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	scheme := "https://"
	if r.TLS != nil {
		scheme = "http://"
	}
	w.Header().Set("Location", scheme+r.Host+r.URL.Path+"/"+strconv.Itoa(task.ID))
	if err := writeResponse(w, http.StatusCreated, model.NewTaskResponse(task)); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}
}

// ReadTask は GET /tasks エンドポイントに対応するハンドラ
func (h *Handler) ReadTask(w http.ResponseWriter, r *http.Request) {
	var req model.ReadTaskRequest
	for k, v := range r.URL.Query() {
		switch k {
		case "isCompleted":
			isCompleted, err := strconv.ParseBool(v[0])
			if err != nil {
				// TODO: エラーレスポンスの生成
				return
			}
			req.IsCompleted = &isCompleted
		case "completedOn":
			completedOn, err := time.Parse(time.RFC3339, v[0])
			if err != nil {
				// TODO: エラーレスポンスの生成
				return
			}
			req.CompletedOn = &completedOn
		}
	}

	ctx := r.Context()
	user := ctx.Value(middleware.UserKey{}).(*model.User)

	tasks, err := h.svc.GetTasks(ctx, user.ID, &req)
	if err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	if err := writeResponse(w, http.StatusOK, model.NewTasksResponse(tasks)); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}
}

// UpdateTask は PATCH /tasks/{taskID} エンドポイントに対応するハンドラ
func (h *Handler) UpdateTask(w http.ResponseWriter, r *http.Request) {
	var req model.UpdateTaskRequest
	taskID, err := strconv.Atoi(chi.URLParam(r, "taskID"))
	if err != nil {
		// TODO: エラーレスポンスの生成
		return
	}
	req.TaskID = taskID
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	ctx := r.Context()
	user := ctx.Value(middleware.UserKey{}).(*model.User)

	task, err := h.svc.GetTask(ctx, req.TaskID)
	if errors.Is(err, sql.ErrNoRows) {
		// TODO: エラーレスポンスの生成
		return
	}
	if user.HasTask(task) {
		// TODO: エラーレスポンスの生成
		return
	}

	if req.Title != "" {
		task.Title = req.Title
	}
	if req.EstimatedPomoNum != nil {
		task.EstimatedPomoNum = *req.EstimatedPomoNum
	}
	if req.DueOn != nil {
		dueOn, err := time.Parse(time.RFC3339, *req.DueOn)
		if err != nil {
			// TODO: エラーレスポンスの生成
			return
		}
		task.DueOn = &dueOn
	}
	if req.CompletedOn != nil {
		completedOn, err := time.Parse(time.RFC3339, *req.CompletedOn)
		if err != nil {
			// TODO: エラーレスポンスの生成
			return
		}
		task.CompletedOn = &completedOn
	}

	if err := h.svc.UpdateTask(ctx, task); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	if err := writeResponse(w, http.StatusOK, model.NewTaskResponse(task)); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}
}

// DeleteTask は DELETE /tasks/{taskID} エンドポイントに対応するハンドラ
func (h *Handler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	var req model.DeleteTaskRequest
	taskID, err := strconv.Atoi(chi.URLParam(r, "taskID"))
	if err != nil {
		// TODO: エラーレスポンスの生成
		return
	}
	req.TaskID = taskID

	ctx := r.Context()
	user := ctx.Value(middleware.UserKey{}).(*model.User)

	task, err := h.svc.GetTask(ctx, req.TaskID)
	if errors.Is(err, sql.ErrNoRows) {
		// TODO: エラーレスポンスの生成
		return
	}
	if !user.HasTask(task) {
		// TODO: エラーレスポンスの生成
		return
	}

	if err := h.svc.DeleteTask(ctx, req.TaskID); err != nil {
		// TODO: エラーレスポンスの生成
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
