package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/minguu42/tomeit"
)

func main() {
	//firebaseApp := tomeit.InitFirebaseApp()

	//db := tomeit.OpenDB(os.Getenv("DSN"))
	//defer tomeit.CloseDB(db)

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	//r.Use(render.SetContentType(render.ContentTypeJSON))
	//r.Use(cors.Handler(cors.Options{
	//	AllowedOrigins:   strings.Split(os.Getenv("ALLOW_ORIGINS"), ","),
	//	AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
	//	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	//	ExposedHeaders:   []string{"Link"},
	//	AllowCredentials: true,
	//}))
	//r.Use(tomeit.UserCtx(db, firebaseApp))

	tomeit.Route(r) // tomeit.Route(r, db)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal("ListenAndServe failed:", err)
	}
}
