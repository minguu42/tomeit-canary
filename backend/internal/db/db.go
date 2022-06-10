// Package db は DB を扱うパッケージ
package db

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/doug-martin/goqu/v9/dialect/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/minguu42/tomeit/internal/log"
)

// NewDialect は MySQL のクエリを生成する goqu.DialectWrapper を返す。
func NewDialect() *goqu.DialectWrapper {
	dialect := goqu.Dialect("mysql")
	return &dialect
}

// NewDB は MySQL に接続し、sql.DB を返す。
func NewDB(ctx context.Context, dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open database. %w", err)
	}

	for count := 0; count < 6; count++ {
		if err = db.PingContext(ctx); err == nil {
			return db, nil
		}
		log.Info("connection to database does not exit. check again after 5 seconds.")
		time.Sleep(time.Second * 5)
	}

	return nil, fmt.Errorf("failed to connect database. %w", err)
}
