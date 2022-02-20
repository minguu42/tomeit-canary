package tomeit

import (
	"time"
)

type User struct {
	ID        int       `db:"id"`
	DigestUID string    `db:"digest_uid"`
	RestCount int       `db:"rest_count"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

func (u User) hasTask(t *Task) bool {
	if u.ID == t.UserID {
		return true
	} else {
		return false
	}
}

func (u User) hasPomodoro(p *Pomodoro) bool {
	if u.ID == p.UserID {
		return true
	} else {
		return false
	}
}
