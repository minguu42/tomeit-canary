// Package mysql はMySQLを扱うパッケージ
package mysql

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/doug-martin/goqu/v9/dialect/mysql"
	_ "github.com/go-sql-driver/mysql"
	tomeit "github.com/minguu42/tomeit/pkg"
)

// dbOperator はtomeit.DBOperatorを実装する構造体
type dbOperator struct {
	dialect goqu.DialectWrapper
	db      *sql.DB
}

// NewDBOperator はtomeit.DBOperatorを実装する構造体を初期化し、返す。
func NewDBOperator(ctx context.Context, dsn string) (*dbOperator, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open mysql. %w", err)
	}

	for count := 0; count < 6; count++ {
		if err = db.PingContext(ctx); err == nil {
			return &dbOperator{
				dialect: goqu.Dialect("mysql"),
				db:      db,
			}, nil
		}

		tomeit.LogInfo("connection to mysql does not exist. check again after 5 seconds.")
		time.Sleep(5 * time.Second)
	}

	return nil, fmt.Errorf("failed to connect mysql. %w", err)
}
