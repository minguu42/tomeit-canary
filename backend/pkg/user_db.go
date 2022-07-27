package tomeit

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
)

// CreateUser はDBにユーザを作成し、返す。
func (m *mysql) CreateUser(ctx context.Context, digestUID string) (*user, error) {
	createdAt := time.Now()
	q, _, err := m.dialect.Insert("users").Rows(
		user{
			DigestUID: digestUID,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		},
	).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create insert sql. %w", err)
	}

	result, err := m.db.ExecContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}
	LogInfo(q)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &user{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}, nil
}

// GetUser はDBからユーザを取得し、返す。
func (m *mysql) GetUser(ctx context.Context, digestUID string) (*user, error) {
	q, _, err := m.dialect.From("users").Select(&user{}).Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var u user
	if err := m.db.QueryRowContext(ctx, q).Scan(&u.CreatedAt, &u.DigestUID, &u.ID, &u.RestCount, &u.UpdatedAt); err != nil {
		return nil, fmt.Errorf("failed to get user row. %w", err)
	}
	LogInfo(q)

	return &u, nil
}
