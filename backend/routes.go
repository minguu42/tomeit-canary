package tomeit

import "github.com/go-chi/chi/v5"

// Route はハンドラ関数とエンドポイント（URL）を対応させる。
func Route(r chi.Router) {
	r.Route("/v0", func(r chi.Router) {
		r.Route("/tasks", func(r chi.Router) {
			r.Post("/", postTasks)
			r.Get("/", getTasks)
			r.Patch("/{taskID}", patchTask)
			r.Delete("/{taskID}", deleteTask)
		})
	})
}
