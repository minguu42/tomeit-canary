package tomeit

import "github.com/go-chi/chi/v5"

func Route(r chi.Router, _ *db) {
	r.Route("/v0", func(r chi.Router) {
		r.Get("/healthz", getHealthz)
	})
}
