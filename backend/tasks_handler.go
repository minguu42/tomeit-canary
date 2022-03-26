package tomeit

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/minguu42/tomeit/logger"
)

func postTasks(db dbInterface) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req postTasksRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			logger.Error.Println("decoder.Decode failed:", err)
			_ = writeResponse(w, http.StatusBadRequest, newErrInvalidRequest(err))
			return
		}
		if req.Title == "" {
			_ = writeResponse(w, http.StatusBadRequest, newErrInvalidRequest(errors.New("missing required title field")))
			return
		}
		dueOn, err := time.Parse(time.RFC3339, req.DueOn)
		if err != nil && req.DueOn != "" {
			_ = writeResponse(w, http.StatusBadRequest, newErrInvalidRequest(errors.New("dueOn field format is wrong")))
			return
		}

		user := r.Context().Value(userKey{}).(*User)

		task, err := db.createTask(user.ID, req.Title, req.ExpectedPomodoroNum, dueOn)
		if err != nil {
			logger.Error.Println("db.createTask failed:", err)
			_ = writeResponse(w, http.StatusBadRequest, newErrInvalidRequest(err))
			return
		}

		scheme := "http://"
		if r.TLS != nil {
			scheme = "https://"
		}
		w.Header().Set("Location", scheme+r.Host+r.URL.Path+"/"+strconv.Itoa(task.ID))
		if err := writeResponse(w, http.StatusCreated, newTaskResponse(task, db)); err != nil {
			logger.Error.Println("writeResponse failed:", err)
			_ = writeResponse(w, http.StatusUnprocessableEntity, newErrRender(err))
			return
		}
	}
}
