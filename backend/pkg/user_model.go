package tomeit

import "time"

type user struct {
	ID        int       `db:"id" goqu:"skipinsert"`
	DigestUID string    `db:"digest_uid"`
	RestCount int       `db:"rest_count" goqu:"skipinsert"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

// HasTask はユーザがそのタスクを持っているかを判定する。
func (u *user) HasTask(t *task) bool {
	if u.ID <= 0 || t.UserID <= 0 {
		return false
	}
	return u.ID == t.UserID
}
