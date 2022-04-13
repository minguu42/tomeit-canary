package tomeit

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

// postTasks は POST /tasks エンドポイントに対応するハンドラ関数である。
func postTasks(w http.ResponseWriter, r *http.Request) {
	var request postTasksRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		log.Printf("decoder.Decode failed: %v", err)
		_ = writeErrResponse(w, newErrBadRequest(err))
		return
	}

	if request.Title == "" {
		log.Println("title is required")
		_ = writeErrResponse(w, newErrBadRequest(errors.New("title is required")))
		return
	}
	var dueOn *time.Time
	if request.DueOn != "" {
		tmpDueOn, err := time.Parse(time.RFC3339, request.DueOn)
		if err != nil {
			log.Printf("time.Parse failed: %v", err)
			_ = writeErrResponse(w, newErrBadRequest(err))
			return
		}
		dueOn = &tmpDueOn
	}

	ctx := r.Context()
	user := ctx.Value(userKey{}).(*user)

	task, err := createTask(r.Context(), user.ID, request.Title, request.EstimatedPomoNum, dueOn)
	if err != nil {
		log.Printf("createTask failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}

	scheme := "https://"
	if r.TLS != nil {
		scheme = "http://"
	}
	w.Header().Set("Location", scheme+r.Host+r.URL.Path+"/"+strconv.Itoa(task.ID))
	if err := writeResponse(w, http.StatusCreated, newTaskResponse(task)); err != nil {
		log.Printf("writeResponse failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}
}

// getTasks は GET /tasks エンドポイントに対応するハンドラ関数である。
func getTasks(w http.ResponseWriter, r *http.Request) {
	var request getTasksRequest
	for k, v := range r.URL.Query() {
		switch k {
		case "isCompleted":
			if isCompleted, err := strconv.ParseBool(v[0]); err == nil {
				request.isCompleted = &isCompleted
			} else {
				log.Printf("strconv.ParseBool failed: %v", err)
				_ = writeErrResponse(w, newErrBadRequest(err))
				return
			}
		case "completedOn":
			if completedOn, err := time.Parse(time.RFC3339, v[0]); err == nil {
				request.completedOn = &completedOn
			} else {
				log.Printf("time.Parse failed: %v", err)
				_ = writeErrResponse(w, newErrBadRequest(err))
				return
			}
		}
	}

	ctx := r.Context()
	user := ctx.Value(userKey{}).(*user)

	tasks, err := getTasksByUserID(ctx, user.ID, &request)
	if err != nil {
		log.Printf("getTasksByUserID failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}

	if err := writeResponse(w, http.StatusOK, newTasksResponse(tasks)); err != nil {
		log.Printf("writeResponse failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}
}

// patchTask は PATCH /tasks/{taskID} エンドポイントに対応するハンドラ関数である。
func patchTask(w http.ResponseWriter, r *http.Request) {
	var request patchTaskRequest
	taskID, err := strconv.Atoi(chi.URLParam(r, "taskID"))
	if err != nil {
		log.Printf("strconv.Atoi failed: %v", err)
		_ = writeErrResponse(w, newErrBadRequest(err))
		return
	}
	request.taskID = taskID
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		log.Printf("decoder.Decode failed: %v", err)
		_ = writeErrResponse(w, newErrBadRequest(err))
		return
	}

	ctx := r.Context()
	user := ctx.Value(userKey{}).(*user)

	task, err := getTaskByID(ctx, request.taskID)
	if errors.Is(err, sql.ErrNoRows) {
		log.Print("the task does not exist")
		_ = writeErrResponse(w, newErrNotFound(err))
		return
	}
	if !user.hasTask(task) {
		log.Printf("Access to the specified resource is not allowed")
		_ = writeErrResponse(w, newErrForbidden(errors.New("access to the specified resource is not allowed")))
		return
	}

	if request.Title != "" {
		task.Title = request.Title
	}
	if request.EstimatedPomoNum != nil {
		task.EstimatedPomoNum = *request.EstimatedPomoNum
	}
	if request.DueOn != nil {
		dueOn, err := time.Parse(time.RFC3339, *request.DueOn)
		if err != nil {
			log.Printf("time.Parse failed: %v", err)
			_ = writeErrResponse(w, newErrBadRequest(err))
			return
		}
		task.DueOn = &dueOn
	}
	if request.CompletedOn != nil {
		completedOn, err := time.Parse(time.RFC3339, *request.CompletedOn)
		if err != nil {
			log.Printf("time.Parse failed: %v", err)
			_ = writeErrResponse(w, newErrBadRequest(err))
			return
		}
		task.CompletedOn = &completedOn
	}

	if err := updateTaskByID(ctx, task); err != nil {
		log.Printf("updateTaskByID failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}

	if err := writeResponse(w, http.StatusOK, newTaskResponse(task)); err != nil {
		log.Printf("writeResponse failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}
}

// deleteTask は DELETE /tasks/{taskID} エンドポイントに対応するハンドラ関数である。
func deleteTask(w http.ResponseWriter, r *http.Request) {
	var request deleteTaskRequest
	taskID, err := strconv.Atoi(chi.URLParam(r, "taskID"))
	if err != nil {
		log.Printf("strconv.Atoi failed: %v", err)
		_ = writeErrResponse(w, newErrBadRequest(err))
		return
	}
	request.taskID = taskID

	ctx := r.Context()
	user := ctx.Value(userKey{}).(*user)

	task, err := getTaskByID(ctx, request.taskID)
	if errors.Is(err, sql.ErrNoRows) {
		log.Print("the task does not exist")
		_ = writeErrResponse(w, newErrNotFound(err))
		return
	}

	if user.ID != task.UserID {
		log.Printf("Access to the specified resource is not allowed")
		_ = writeErrResponse(w, newErrForbidden(errors.New("access to the specified resource is not allowed")))
		return
	}

	if err := deleteTaskByID(ctx, request.taskID, user.ID); err != nil {
		log.Printf("deleteTaskByID failed: %v", err)
		_ = writeErrResponse(w, newErrInternalServerError(err))
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
