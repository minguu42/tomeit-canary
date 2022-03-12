package tomeit

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/doug-martin/goqu/v9/dialect/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/minguu42/tomeit/logger"
)

type dbInterface interface {
	userDBInterface
	taskDBInterface
	//pomodoroDBInterface
}

type DB struct {
	db      *sql.DB
	dialect *goqu.DialectWrapper
}

func OpenDB(dsn string) (*DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	isDBReady := false
	failureTimes := 0
	for !isDBReady {
		err := db.Ping()
		switch {
		case err == nil:
			isDBReady = true
		case failureTimes <= 6:
			logger.Info.Println("db.Ping failed. try again in 5 seconds.")
			time.Sleep(time.Second * 5)
			failureTimes += 1
		default:
			return nil, fmt.Errorf("db.Ping failed: %w", err)
		}
	}

	dialect := goqu.Dialect("mysql")
	return &DB{db: db, dialect: &dialect}, nil
}

func CloseDB(db *DB) {
	if err := db.db.Close(); err != nil {
		logger.Error.Fatalln("db.Close failed:", err)
	}
}
