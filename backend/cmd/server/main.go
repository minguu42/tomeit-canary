package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	_ "github.com/GoogleCloudPlatform/berglas/pkg/auto"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	tomeit "github.com/minguu42/tomeit/pkg"
	"github.com/minguu42/tomeit/pkg/firebase"
	"github.com/minguu42/tomeit/pkg/mysql"
)

func main() {
	if err := _main(); err != nil {
		log.Fatal("failed to run _main().", err)
	}
}

func _main() error {
	var (
		allowedOrigins        = os.Getenv("ALLOWED_ORIGINS")
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	switch {
	case allowedOrigins == "":
		return errors.New("environment ALLOWED_ORIGINS does not exist")
	case dsn == "":
		return errors.New("environment DSN does not exist")
	case googleCredentialsJSON == "":
		return errors.New("environment GOOGLE_CREDENTIALS_JSON does not exist")
	}

	ctx := context.Background()

	dbOperator, err := mysql.NewDBOperator(ctx, dsn)
	if err != nil {
		return fmt.Errorf("failed to create dbOperator. %w", err)
	}
	tomeit.SetDBOperator(dbOperator)

	authenticator, err := firebase.NewAuthenticator(ctx, googleCredentialsJSON)
	if err != nil {
		return fmt.Errorf("failed to create authenticator. %w", err)
	}
	tomeit.SetAuthenticator(authenticator)

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
		r.Post("/", tomeit.PostTasks)
		r.Get("/", tomeit.GetTasks)
		r.Patch("/{taskID}", tomeit.PatchTask)
		r.Delete("/{taskID}", tomeit.DeleteTask)
	})
	r.Get("/healthz", tomeit.GetHealthz)

	if err := http.ListenAndServe(":8080", r); err != nil {
		return fmt.Errorf("failed to run server: %w", err)
	}
	return nil
}
