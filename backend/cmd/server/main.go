package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/GoogleCloudPlatform/berglas/pkg/berglas"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	tomeit "github.com/minguu42/tomeit/pkg"
)

func main() {
	if err := _main(); err != nil {
		tomeit.LogFatal("failed to run _main().", err)
	}
}

func _main() error {
	ctx := context.Background()

	switch apiEnv := os.Getenv("API_ENV"); apiEnv {
	case "production":
		if err := berglas.Replace(ctx, "ALLOWED_ORIGINS"); err != nil {
			return fmt.Errorf("failed to replace environment variable ALLOWED_ORIGINS. %w", err)
		}
		if err := berglas.Replace(ctx, "DSN"); err != nil {
			return fmt.Errorf("failed to replace environment variable DSN. %w", err)
		}
		if err := berglas.Replace(ctx, "GOOGLE_CREDENTIALS_JSON"); err != nil {
			return fmt.Errorf("failed to replace environment variable GOOGLE_CREDENTIALS_JSON. %w", err)
		}
	case "":
		return errors.New("environment variable API_ENV does not exist")
	}

	var (
		allowedOrigins        = os.Getenv("ALLOWED_ORIGINS")
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	switch {
	case allowedOrigins == "":
		return errors.New("environment variable ALLOWED_ORIGINS does not exist")
	case dsn == "":
		return errors.New("environment variable DSN does not exist")
	case googleCredentialsJSON == "":
		return errors.New("environment variable GOOGLE_CREDENTIALS_JSON does not exist")
	}

	mysql, err := tomeit.NewMySQL(ctx, dsn)
	if err != nil {
		return fmt.Errorf("failed to init mysql. %w", err)
	}
	tomeit.SetDBOperator(mysql)

	firebaseAuth, err := tomeit.NewFirebaseAuth(ctx, googleCredentialsJSON)
	if err != nil {
		return fmt.Errorf("failed to init firebase auth. %w", err)
	}
	tomeit.SetAuthenticator(firebaseAuth)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   strings.Split(allowedOrigins, ","),
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(tomeit.AuthMiddleware)
	r.Use(middleware.Recoverer)

	r.Route("/tasks", func(r chi.Router) {
		r.Post("/", tomeit.CreateTask)
		r.Get("/", tomeit.GetTasks)
		r.Patch("/{taskID}", tomeit.UpdateTask)
		r.Delete("/{taskID}", tomeit.DeleteTask)
	})
	r.Get("/healthz", tomeit.GetHealthz)

	if err := http.ListenAndServe(":8080", r); err != nil {
		return fmt.Errorf("failed to run server: %w", err)
	}
	return nil
}
