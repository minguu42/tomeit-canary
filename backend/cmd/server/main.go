package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/minguu42/tomeit"
)

func init() {
	tomeit.InitLogger(true)
}

func main() {
	if err := _main(); err != nil {
		log.Fatalf("_main failed: %v", err)
	}
}

func _main() error {
	var (
		apiEnv                = "local"
		port                  = "8080"
		allowedOrigins        = "https://*,http://*"
		driverName            = "mysql"
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	if envAPIEnv := os.Getenv("API_ENV"); envAPIEnv != "" {
		apiEnv = envAPIEnv
	}
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}
	if envAllowedOrigins := os.Getenv("ALLOWED_ORIGINS"); envAllowedOrigins != "" {
		allowedOrigins = envAllowedOrigins
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

	var authenticator tomeit.Authenticator
	var err error
	switch apiEnv {
	case "production":
		authenticator, err = tomeit.NewFirebaseApp()
		if err != nil {
			return fmt.Errorf("tomeit.NewFirebaseApp failed: %w", err)
		}
	default:
		authenticator = tomeit.NewFirebaseAppMock()
	}

	if err := tomeit.OpenDB(driverName, dsn); err != nil {
		return fmt.Errorf("tomeit.OpenDB failed: %w", err)
	}
	defer tomeit.CloseDB()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   strings.Split(allowedOrigins, ","),
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(tomeit.Auth(authenticator))
	r.Use(middleware.Recoverer)
	tomeit.Route(r)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		return fmt.Errorf("http.ListenAndServe failed: %w", err)
	}
	return nil
}
