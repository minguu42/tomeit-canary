package tomeit

import (
	"encoding/json"
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
			// TODO: エラーレスポンスを作成する
			return
		}
		if req.Title == "" {
			logger.Info.Println("missing required title field")
			w.WriteHeader(http.StatusBadRequest)
			// TODO: エラーレスポンスを生成する
			return
		}
		dueOn, err := time.Parse(time.RFC3339, req.DueOn)
		if err != nil && req.DueOn != "" {
			logger.Info.Println("dueOn field format is wrong")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		user := r.Context().Value(userKey{}).(*User)

		task, err := db.createTask(user.ID, req.Title, req.ExpectedPomodoroNum, dueOn)
		if err != nil {
			logger.Error.Println("db.createTask failed:", err)
			w.WriteHeader(http.StatusBadRequest)
			// TODO: エラーレスポンスを生成する
			return
		}

		scheme := "http://"
		if r.TLS != nil {
			scheme = "https://"
		}
		w.Header().Set("Location", scheme+r.Host+r.URL.Path+"/"+strconv.Itoa(task.ID))
		if err := writeResponse(w, http.StatusCreated, newTaskResponse(task, db)); err != nil {
			logger.Error.Println("writeResponse failed:", err)
			// TODO: エラーレスポンスを生成する
			return
		}
	}
}

//func (p *patchTaskRequest) Bind(r *http.Request) error {
//	if p.IsCompleted != "true" && p.IsCompleted != "false" {
//		return fmt.Errorf("isCompleted value is wrong")
//	}
//	return nil
//}

//func (p *putTaskRequest) Bind(r *http.Request) error {
//	if p.Title == "" {
//		return fmt.Errorf("missing required title field")
//	}
//	if p.DueOn == "" {
//		p.DueOn = "0001-01-01T00:00:00Z"
//	}
//	if _, err := time.Parse(time.RFC3339, p.DueOn); err != nil {
//		return fmt.Errorf("dueOn field value is invalid")
//	}
//	return nil
//}

//func putTask(db dbInterface) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		taskID, err := strconv.ParseInt(chi.URLParam(r, "taskID"), 10, 64)
//		if err != nil {
//			log.Println("strconv.ParseInt failed:", err)
//			_ = render.Render(w, r, badRequestError(err))
//			return
//		}
//
//		user := r.Context().Value(userKey).(*User)
//
//		task, err := db.getTaskByID(int(taskID))
//		if err != nil {
//			log.Println("db.getTaskByID failed:", err)
//			_ = render.Render(w, r, notFoundError(err))
//			return
//		}
//
//		if !user.hasTask(task) {
//			log.Println("user does not have a task")
//			_ = render.Render(w, r, authorizationError(err))
//			return
//		}
//
//		data := &putTaskRequest{}
//		if err := render.Bind(r, data); err != nil {
//			log.Println("render.Bind failed:", err)
//			_ = render.Render(w, r, badRequestError(err))
//			return
//		}
//		dueOn, _ := time.Parse(time.RFC3339, data.DueOn)
//
//		task.Title = data.Title
//		task.ExpectedPomodoroNum = data.ExpectedPomodoroNum
//		task.DueOn = &dueOn
//		task.IsCompleted = data.IsCompleted
//
//		if err := db.updateTask(task); err != nil {
//			log.Println("db.updateTask failed:", err)
//			_ = render.Render(w, r, badRequestError(err))
//			return
//		}
//
//		task, err = db.getTaskByID(task.ID)
//		if err != nil {
//			log.Println("db.getTaskByID failed:", err)
//			_ = render.Render(w, r, internalServerError(err))
//			return
//		}
//
//		if err := render.Render(w, r, newTaskResponse(task, db)); err != nil {
//			log.Println("render.Render failed:", err)
//			_ = render.Render(w, r, internalServerError(err))
//			return
//		}
//	}
//}

//func getTasks(db dbInterface) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		var options getTasksOptions
//
//		isCompletedStr := r.URL.Query().Get("isCompleted")
//		if isCompletedStr == "true" {
//			options.isCompletedExists = true
//			options.isCompleted = true
//		} else if isCompletedStr == "false" {
//			options.isCompletedExists = true
//			options.isCompleted = false
//		}
//
//		completedOnStr := r.URL.Query().Get("createdOn")
//		if completedOn, err := time.Parse(time.RFC3339, completedOnStr); err == nil {
//			options.completedOnExists = true
//			options.completedOn = completedOn
//		}
//
//		user := r.Context().Value(userKey).(*User)
//
//		tasks, err := db.getTasksByUser(user, &options)
//		if err != nil {
//			log.Println("db.getTasksByUser failed:", err)
//			_ = render.Render(w, r, internalServerError(err))
//			return
//		}
//
//		if err := render.Render(w, r, newTasksResponse(tasks, db)); err != nil {
//			log.Println("render.Render failed:", err)
//			_ = render.Render(w, r, internalServerError(err))
//			return
//		}
//	}
//}

//func deleteTask(db dbInterface) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		taskID, err := strconv.ParseInt(chi.URLParam(r, "taskID"), 10, 64)
//		if err != nil {
//			log.Println("strconv.ParseInt failed:", err)
//			_ = render.Render(w, r, badRequestError(err))
//			return
//		}
//
//		user := r.Context().Value(userKey).(*User)
//
//		task, err := db.getTaskByID(int(taskID))
//		if err != nil {
//			log.Println("db.getTaskByID failed:", err)
//			_ = render.Render(w, r, notFoundError(err))
//			return
//		}
//
//		if !user.hasTask(task) {
//			log.Println("user does not have a task")
//			_ = render.Render(w, r, authorizationError(errors.New("task's userID does not match your userID")))
//			return
//		}
//
//		if err := db.deleteTask(task); err != nil {
//			log.Println("db.deleteTask failed:", err)
//			_ = render.Render(w, r, badRequestError(err))
//			return
//		}
//
//		w.WriteHeader(204)
//	}
//}
