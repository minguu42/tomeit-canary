package tomeit

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/doug-martin/goqu/v9/dialect/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/minguu42/tomeit/logger"
)

type DBInterface interface {
	UserDBInterface
	taskDBInterface
	pomodoroDBInterface
}

type DB struct {
	sqlDB *sql.DB
}

func OpenDB(dsn string) (*DB, error) {
	sqlDB, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	isDBReady := false
	failureTimes := 0
	for !isDBReady {
		err := sqlDB.Ping()
		switch {
		case err == nil:
			isDBReady = true
		case failureTimes <= 6:
			logger.Info.Println("sqlDB.Ping failed. try again in 5 seconds.")
			time.Sleep(time.Second * 5)
			failureTimes += 1
		default:
			return nil, fmt.Errorf("sqlDB.Ping failed: %w", err)
		}
	}

	return &DB{sqlDB: sqlDB}, nil
}

func CloseDB(db *DB) {
	if err := db.sqlDB.Close(); err != nil {
		logger.Error.Fatalln("sqlDB.Close failed:", err)
	}
}
