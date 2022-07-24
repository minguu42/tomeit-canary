package mysql

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	tomeit "github.com/minguu42/tomeit/pkg"
	"github.com/minguu42/tomeit/pkg/logging"
)

// CreateUser はMySQLにtomeit.Userを作成し、返す。
func (o *dbOperator) CreateUser(ctx context.Context, digestUID string) (*tomeit.User, error) {
	createdAt := time.Now()
	q, _, err := o.dialect.Insert("users").Rows(
		tomeit.User{
			DigestUID: digestUID,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create insert sql. %w", err)
	}

	result, err := o.db.ExecContext(ctx, q)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}
	logging.Info(q)

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &tomeit.User{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}, nil
}

// GetUser はMySQLからtomeit.Userを取得し、返す。
func (o *dbOperator) GetUser(ctx context.Context, digestUID string) (*tomeit.User, error) {
	q, _, err := o.dialect.From("users").Select(&tomeit.User{}).Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var u tomeit.User
	if err := o.db.QueryRowContext(ctx, q).Scan(&u.CreatedAt, &u.DigestUID, &u.ID, &u.RestCount, &u.UpdatedAt); err != nil {
		return nil, fmt.Errorf("failed to get user row. %w", err)
	}
	logging.Info(q)

	return &u, nil
}
