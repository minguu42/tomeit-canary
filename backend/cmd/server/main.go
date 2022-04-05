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
		driverName            = "mysql"
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}
	if envDriverName := os.Getenv("DRIVER_NAME"); envDriverName != "" {
		driverName = envDriverName
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

	if err := tomeit.OpenDB(driverName, dsn); err != nil {
		return fmt.Errorf("tomeit.OpenDB failed: %w", err)
	}
	defer tomeit.CloseDB()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(tomeit.Auth(firebaseApp))
	r.Use(middleware.Recoverer)
	// TODO: CORS ミドルウェアを追加する
	tomeit.Route(r)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		return fmt.Errorf("http.ListenAndServe failed: %w", err)
	}
	return nil
}
