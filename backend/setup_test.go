package tomeit

import (
	"encoding/json"
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
	"github.com/minguu42/tomeit/logger"
)

var (
	testClient *http.Client
	testUrl    string
	testDB     *db
)

func TestMain(m *testing.M) {
	logger.InitLogger(false, false, false)
	firebaseAppMock := &firebaseAppMock{}

	var err error
	testDB, err = OpenDB("test:password@tcp(localhost:13306)/db_test?charset=utf8mb4&parseTime=true")
	if err != nil {
		log.Fatalln("OpenDB failed:", err)
	}
	defer CloseDB(testDB)

	r := chi.NewRouter()
	r.Use(Auth(testDB, firebaseAppMock))
	Route(r, testDB)

	ts := httptest.NewServer(r)
	defer ts.Close()
	testUrl = ts.URL
	testClient = &http.Client{}

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
		_, _ = testDB.db.Exec(query)
	}

	sql, _, _ := goqu.Insert("users").Cols("digest_uid").Vals(goqu.Vals{"a2c4ba85c41f186283948b1a54efacea04cb2d3f54a88d5826a7e6a917b28c5a"}).ToSQL()

	_, _ = testDB.db.Exec(sql)
}

func teardownTestDB() {
	const dropPomodorosTable = `DROP TABLE IF EXISTS pomodoros`
	const dropTasksTable = `DROP TABLE IF EXISTS tasks`
	const dropUsersTable = `DROP TABLE IF EXISTS users`

	_, _ = testDB.db.Exec(dropPomodorosTable)
	_, _ = testDB.db.Exec(dropTasksTable)
	_, _ = testDB.db.Exec(dropUsersTable)
}

func doTestRequest(tb testing.TB, method, path string, params *map[string]string, body io.Reader, respBodyType string) (*http.Response, interface{}) {
	req, err := http.NewRequest(method, testUrl+path, body)
	if err != nil {
		tb.Fatal("http.NewRequest failed:", err)
	}
	if params != nil {
		ps := req.URL.Query()
		for k, v := range *params {
			ps.Add(k, v)
		}
		req.URL.RawQuery = ps.Encode()
	}
	req.Header.Set("Authorization", "Bearer someJWT")

	resp, err := testClient.Do(req)
	if err != nil {
		tb.Fatal("testClient.Do failed:", err)
	}
	defer resp.Body.Close()

	bytes, err := io.ReadAll(resp.Body)
	if err != nil {
		tb.Fatal("io.ReadAll failed:", err)
	}

	switch respBodyType {
	case "taskResponse":
		var respBody taskResponse
		if err := json.Unmarshal(bytes, &respBody); err != nil {
			return resp, nil
		}
		return resp, respBody
	case "healthzResponse":
		var respBody healthzResponse
		if err := json.Unmarshal(bytes, &respBody); err != nil {
			return resp, nil
		}
		return resp, respBody
	}

	return resp, nil
}
