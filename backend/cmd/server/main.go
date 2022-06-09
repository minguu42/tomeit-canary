package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/minguu42/tomeit/db"
	"github.com/minguu42/tomeit/firebase"
	"github.com/minguu42/tomeit/handler"
	"github.com/minguu42/tomeit/handler/middleware"
	"github.com/minguu42/tomeit/service"
)

func main() {
	if err := _main(); err != nil {
		log.Fatalf("failed to run _main function. %v", err)
	}
}

func _main() error {
	var (
		apiEnv                = os.Getenv("API_ENV")
		allowedOrigins        = os.Getenv("ALLOWED_ORIGINS")
		dsn                   = os.Getenv("DSN")
		googleCredentialsJSON = os.Getenv("GOOGLE_CREDENTIALS_JSON")
	)
	switch {
	case apiEnv == "":
		return errors.New("environment API_ENV does not exist")
	case allowedOrigins == "":
		return errors.New("environment ALLOWED_ORIGINS does not exist")
	case dsn == "":
		return errors.New("environment DSN does not exist")
	case googleCredentialsJSON == "":
		return errors.New("environment GOOGLE_CREDENTIALS_JSON does not exist")
	}

	ctx := context.Background()

	dialect := db.NewDialect()
	mysql, err := db.NewDB(ctx, dsn)
	if err != nil {
		return fmt.Errorf("failed to create db. %w", err)
	}

	firebaseApp, err := firebase.NewApp(ctx, googleCredentialsJSON)
	if err != nil {
		return fmt.Errorf("failed to create firebase app. %w", err)
	}

	svc, err := service.New(dialect, mysql, firebaseApp)
	if err != nil {
		return fmt.Errorf("failed to create service. %w", err)
	}

	r := chi.NewRouter()
	m := middleware.New(svc)
	r.Use(m.Log)
	r.Use(m.CORS(strings.Split(allowedOrigins, ",")))
	r.Use(m.Auth)
	r.Use(m.Recover)
	h := handler.New(svc)
	h.Route(r)

	if err := http.ListenAndServe(":8080", r); err != nil {
		return fmt.Errorf("failed to run server: %w", err)
	}
	return nil
}
