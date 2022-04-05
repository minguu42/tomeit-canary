package tomeit

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/logger"
)

// createUser は user を作成し、返す。
func createUser(ctx context.Context, digestUID string) (*user, error) {
	createdAt := time.Now()
	sql, _, err := dialect.Insert("users").Rows(
		user{
			DigestUID: digestUID,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		},
	).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	result, err := db.ExecContext(ctx, sql)
	if err != nil {
		return nil, fmt.Errorf("db.ExecContext failed: %w", err)
	}
	logger.Debug.Println(sql)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("result.LastInsertId failed: %w", err)
	}

	return &user{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}, nil
}

// getUserByDigestUID は user を取得し、返す。
func getUserByDigestUID(ctx context.Context, digestUID string) (*user, error) {
	sql, _, err := dialect.From("users").Select(&user{}).Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("ds.ToSQL failed: %w", err)
	}

	var u user
	if err := db.QueryRowContext(ctx, sql).Scan(&u.CreatedAt, &u.DigestUID, &u.ID, &u.RestCount, &u.UpdatedAt); err != nil {
		return nil, fmt.Errorf("db.QueryRowContext failed: %w", err)
	}
	logger.Debug.Println(sql)

	return &u, nil
}
