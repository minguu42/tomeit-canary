// Package db は DB を扱うパッケージ
package db

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// NewDB は MySQL に接続し、sql.DB を返す。
func NewDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open database. %w", err)
	}

	for count := 0; count < 6; count++ {
		if err := db.Ping(); err == nil {
			return db, nil
		}
		log.Println("connection to database does not exit. check again after 5 seconds.")
		time.Sleep(time.Second * 5)
	}

	return nil, fmt.Errorf("failed to connect database. %w", err)
}
