package main

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/minguu42/tomeit"
	"github.com/minguu42/tomeit/logging"
)

func main() {
	logging.InitLogger()

	//firebaseApp, err := tomeit.InitFirebaseApp()
	//if err != nil {
	//	logging.Error.Fatalln("tomeit.InitFirebaseApp failed:", err)
	//}
	//
	//db := tomeit.OpenDB(os.Getenv("DSN"))
	//defer tomeit.CloseDB(db)

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	//r.Use(middlewares.Auth(db, firebaseApp))
	r.Use(middleware.Recoverer)
	//r.Use(render.SetContentType(render.ContentTypeJSON))
	//r.Use(cors.Handler(cors.Options{
	//	AllowedOrigins:   strings.Split(os.Getenv("ALLOW_ORIGINS"), ","),
	//	AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
	//	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	//	ExposedHeaders:   []string{"Link"},
	//	AllowCredentials: true,
	//}))

	tomeit.Route(r) // tomeit.Route(r, db)

	port := os.Getenv("PORT")
	if port == "" {
		logging.Error.Fatalln("$PORT must be set")
	}

	if err := http.ListenAndServe(":"+port, r); err != nil {
		logging.Error.Fatalln("http.ListenAndServe failed:", err)
	}
}
