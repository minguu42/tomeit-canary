package tomeit

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/doug-martin/goqu/v9"
	"github.com/go-chi/chi/v5"
)

var testUrl string

func TestMain(m *testing.M) {
	InitLogger(false)
	authenticator := NewFirebaseAppMock()

	if err := OpenDB("mysql", "test:password@tcp(localhost:13306)/db_test?charset=utf8mb4&parseTime=true"); err != nil {
		log.Fatalf("OpenDB failed: %v", err)
	}
	defer CloseDB()

	r := chi.NewRouter()
	r.Use(Auth(authenticator))
	Route(r)

	ts := httptest.NewServer(r)
	defer ts.Close()
	testUrl = ts.URL

	m.Run()
}

func setupTestDB(tb testing.TB) {
	file, err := os.ReadFile(filepath.Join(".", "build", "create_tables.sql"))
	if err != nil {
		tb.Fatal("os.ReadFile failed:", err)
	}
	queries := strings.Split(string(file), ";")
	for _, query := range queries {
		if query == "" {
			break
		}
		_, _ = db.Exec(query)
	}

	sql, _, err := dialect.Insert("users").Cols("digest_uid").Vals(
		goqu.Vals{"a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a"},
		goqu.Vals{"b29699122faef2224c89e684557b0d0a435fc95fb822a1d6e69638467903fff6"},
	).ToSQL()
	if err != nil {
		tb.Fatalf("ds.ToSQL failed: %v", err)
	}

	if _, err = db.Exec(sql); err != nil {
		tb.Fatalf("db.Exec failed: %v", err)
	}
}

func teardownTestDB() {
	const dropPomodorosTable = `DROP TABLE IF EXISTS pomodoros`
	const dropTasksTable = `DROP TABLE IF EXISTS tasks`
	const dropUsersTable = `DROP TABLE IF EXISTS users`

	_, _ = db.Exec(dropPomodorosTable)
	_, _ = db.Exec(dropTasksTable)
	_, _ = db.Exec(dropUsersTable)
}

func doTestRequest(method, path string, params map[string]string, body io.Reader, respBody interface{}) (*http.Response, error) {
	req, err := http.NewRequest(method, testUrl+path, body)
	if err != nil {
		return nil, fmt.Errorf("http.NewRequest failed: %w", err)
	}
	if params != nil {
		ps := req.URL.Query()
		for k, v := range params {
			ps.Add(k, v)
		}
		req.URL.RawQuery = ps.Encode()
	}
	req.Header.Set("Authorization", "Bearer someJWT")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("DefaultClient.Do failed: %w", err)
	}

	if respBody != nil {
		if err := json.NewDecoder(resp.Body).Decode(respBody); err != nil {
			return nil, fmt.Errorf("decoder.Decode failed: %w", err)
		}
	}
	return resp, nil
}
