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

type db struct {
	db      *sql.DB
	dialect *goqu.DialectWrapper
}

func OpenDB(dsn string) (*db, error) {
	sqlDB, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("sql.Open failed: %w", err)
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

	dialect := goqu.Dialect("mysql")
	return &db{db: sqlDB, dialect: &dialect}, nil
}

func CloseDB(db *db) error {
	return db.db.Close()
}
