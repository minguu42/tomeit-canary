package main

import (
	"errors"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/minguu42/tomeit"
	"github.com/minguu42/tomeit/logger"
)

func main() {
	if err := _main(); err != nil {
		logger.Error.Fatalln("_main:", err)
	}
}

func _main() error {
	var (
		port                  = "8080"
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
		allowOrigins          = os.Getenv("ALLOW_ORIGINS")
	)
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}
	if dsn == "" {
		return errors.New("environment variable DSN does not exist")
	}
	if googleCredentialsJSON == "" {
		return errors.New("environment variable GOOGLE_CREDENTIALS_JSON does not exist")
	}
	if allowOrigins == "" {
		return errors.New("environment variable ALLOW_ORIGINS does not exist")
	}

	logger.InitLogger()

	firebaseApp, err := tomeit.InitFirebaseApp()
	if err != nil {
		logger.Error.Fatalln("tomeit.InitFirebaseApp:", err)
	}

	db, err := tomeit.OpenDB(dsn)
	if err != nil {
		logger.Error.Fatalln("tomeit.OpenDB:", err)
	}
	defer tomeit.CloseDB(db)

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(tomeit.Auth(db, firebaseApp))
	r.Use(middleware.Recoverer)
	//r.Use(cors.Handler(cors.Options{
	//	AllowedOrigins:   strings.Split(allowOrigins, ","),
	//	AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
	//	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	//	ExposedHeaders:   []string{"Link"},
	//	AllowCredentials: true,
	//}))

	tomeit.Route(r, db)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		logger.Error.Fatalln("http.ListenAndServe:", err)
	}
	return nil
}
