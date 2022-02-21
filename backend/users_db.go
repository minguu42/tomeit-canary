package tomeit

import (
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/logger"
)

type userDBInterface interface {
	CreateUser(digestUID string) (*User, error)
	GetUserByDigestUID(digestUID string) (*User, error)
	decrementRestCount(user *User) error
}

func (db *DB) CreateUser(digestUID string) (*User, error) {
	createdAt := time.Now()

	sql, _, err := db.dialect.Insert("users").Cols("digest_uid", "created_at", "updated_at").Vals(goqu.Vals{digestUID, createdAt, createdAt}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}
	result, err := db.db.Exec(sql)
	if err != nil {
		return nil, fmt.Errorf("db.Exec failed: %w", err)
	}
	logger.Debug.Println(sql)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("result.LastInsertId failed: %w", err)
	}

	user := User{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}
	return &user, nil
}

func (db *DB) GetUserByDigestUID(digestUID string) (*User, error) {
	var user User

	sql, _, err := db.dialect.From("users").Select("id", "digest_uid", "rest_count", "created_at", "updated_at").Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}
	if err := db.db.QueryRow(sql).Scan(&user.ID, &user.DigestUID, &user.RestCount, &user.CreatedAt, &user.UpdatedAt); err != nil {
		return nil, fmt.Errorf("row.Scan failed: %w", err)
	}
	logger.Debug.Println(sql)

	return &user, nil
}

func (db *DB) decrementRestCount(user *User) error {
	// TODO: 要実装
	return nil
}
