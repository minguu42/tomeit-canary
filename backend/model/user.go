package model

import "time"

type User struct {
	ID        int       `db:"id" goqu:"skipinsert"`
	DigestUID string    `db:"digest_uid"`
	RestCount int       `db:"rest_count" goqu:"skipinsert"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}
