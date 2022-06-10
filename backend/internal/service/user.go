package service

import (
	"context"
	"fmt"
	"time"

	"github.com/doug-martin/goqu/v9"
	"github.com/minguu42/tomeit/internal/model"
)

// CreateUser は DB に model.User を作成し、返す。
func (s *service) CreateUser(ctx context.Context, digestUID string) (*model.User, error) {
	createdAt := time.Now()
	query, _, err := s.dialect.Insert("users").Rows(
		model.User{
			DigestUID: digestUID,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		},
	).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create insert sql. %w", err)
	}

	result, err := s.db.ExecContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to exec insert sql. %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get id. %w", err)
	}

	return &model.User{
		ID:        int(id),
		DigestUID: digestUID,
		RestCount: 4,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}, nil
}

// GetUser は DB から model.User を取得し、返す。
func (s *service) GetUser(ctx context.Context, digestUID string) (*model.User, error) {
	query, _, err := s.dialect.From("users").Select(&model.User{}).Where(goqu.Ex{"digest_uid": digestUID}).ToSQL()
	if err != nil {
		return nil, fmt.Errorf("failed to create select sql. %w", err)
	}

	var u model.User
	if err := s.db.QueryRowContext(ctx, query).Scan(&u.CreatedAt, &u.DigestUID, &u.ID, &u.RestCount, &u.UpdatedAt); err != nil {
		return nil, fmt.Errorf("failed to get user row. %w", err)
	}

	return &u, nil
}
