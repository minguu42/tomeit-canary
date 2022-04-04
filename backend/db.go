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

var (
	dialect goqu.DialectWrapper
	db      *sql.DB
)

func OpenDB(driverName, dsn string) error {
	dialect = goqu.Dialect(driverName)

	var err error
	db, err = sql.Open(driverName, dsn)
	if err != nil {
		return fmt.Errorf("sql.Open failed: %w", err)
	}

	for count := 0; count < 6; count++ {
		err = db.Ping()
		if err == nil {
			return nil
		}
		logger.Info.Println("db.Ping failed. try again in 5 seconds.")
		time.Sleep(time.Second * 5)
	}
	return fmt.Errorf("db.Ping failed: %w", err)
}

func CloseDB() error {
	return db.Close()
}
