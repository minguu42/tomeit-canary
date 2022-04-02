package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/minguu42/tomeit"
	"github.com/minguu42/tomeit/logger"
)

func init() {
	logger.InitLogger(true, true, true)
}

func main() {
	if err := _main(); err != nil {
		logger.Error.Fatalln("_main failed:", err)
	}
}

func _main() error {
	var (
		port                  = "8080"
		allowOrigins          = "http://localhost:3000"
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}
	if envAllowOrigins := os.Getenv("ALLOW_ORIGINS"); envAllowOrigins != "" {
		allowOrigins = envAllowOrigins
	}
	if dsn == "" {
		return errors.New("environment variable DSN does not exist")
	}
	if googleCredentialsJSON == "" {
		return errors.New("environment variable GOOGLE_CREDENTIALS_JSON does not exist")
	}

	firebaseApp, err := tomeit.InitFirebaseApp()
	if err != nil {
		return fmt.Errorf("tomeit.InitFirebaseApp failed: %w", err)
	}

	db, err := tomeit.OpenDB(dsn)
	if err != nil {
		return fmt.Errorf("tomeit.OpenDB failed: %w", err)
	}
	defer tomeit.CloseDB(db)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(tomeit.Auth(db, firebaseApp))
	r.Use(middleware.Recoverer)
	logger.Debug.Println("TODO: CORS", allowOrigins)
	tomeit.Route(r, db)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		return fmt.Errorf("http.ListenAndServe failed: %w", err)
	}
	return nil
}
