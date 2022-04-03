package tomeit

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/minguu42/tomeit/logger"
)

func postTasks(db *db) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var postTasksRequest postTasksRequest
		if err := json.NewDecoder(r.Body).Decode(&postTasksRequest); err != nil {
			logger.Error.Println("decoder.Decode failed:", err)
			_ = writeErrResponse(w, newErrBadRequest(err))
			return
		}

		if postTasksRequest.Title == "" {
			_ = writeErrResponse(w, newErrBadRequest(errors.New("property title is required")))
			return
		}
		var dueOn *time.Time
		if postTasksRequest.DueOn != "" {
			tmpDueOn, err := time.Parse(time.RFC3339, postTasksRequest.DueOn)
			if err != nil {
				logger.Error.Println("time.Parse failed:", err)
				_ = writeErrResponse(w, newErrBadRequest(err))
				return
			}
			dueOn = &tmpDueOn
		}

		user := r.Context().Value(userKey{}).(*User)

		task, err := db.createTask(user, postTasksRequest.Title, postTasksRequest.EstimatedPomoNum, dueOn)
		if err != nil {
			logger.Error.Println("Database.createTask failed:", err)
			_ = writeErrResponse(w, newErrInternalServerError(err))
			return
		}

		scheme := "http://"
		if r.TLS != nil {
			scheme = "https://"
		}
		w.Header().Set("Location", scheme+r.Host+r.URL.Path+"/"+strconv.Itoa(task.id))
		if err := writeResponse(w, http.StatusCreated, newTaskResponse(task)); err != nil {
			logger.Error.Println("writeResponse failed:", err)
			_ = writeErrResponse(w, newErrInternalServerError(err))
			return
		}
	}
}

func getTasks(db *db) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request getTasksRequest
		for k, v := range r.URL.Query() {
			switch k {
			case "isCompleted":
				var isCompleted *bool
				if isCompletedBool, err := strconv.ParseBool(v[0]); err == nil {
					isCompleted = &isCompletedBool
				} else {
					logger.Error.Printf("strconv.ParseBool failed: %v", err)
					_ = writeErrResponse(w, newErrBadRequest(err))
					return
				}
				request.isCompleted = isCompleted
			case "completedOn":
				var completedOn *time.Time
				if completedOnTime, err := time.Parse(time.RFC3339, v[0]); err == nil {
					completedOn = &completedOnTime
				} else {
					logger.Error.Printf("time.Parse failed: %v", err)
					_ = writeErrResponse(w, newErrBadRequest(err))
					return
				}
				request.completedOn = completedOn
			}
		}

		user := r.Context().Value(userKey{}).(*User)

		tasks, err := db.getTasksByUserID(user, &request)
		if err != nil {
			logger.Error.Printf("db.getTasksByUserID failed: %v", err)
			_ = writeErrResponse(w, newErrInternalServerError(err))
			return
		}

		if err := writeResponse(w, http.StatusOK, newTasksResponse(tasks)); err != nil {
			logger.Error.Printf("writeResponse failed: %v", err)
			_ = writeErrResponse(w, newErrInternalServerError(err))
			return
		}
	}
}
