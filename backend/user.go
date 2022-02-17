package tomeit

import (
	"time"
)

type User struct {
	ID        int
	DigestUID string
	RestCount int
	CreatedAt time.Time
	UpdatedAt time.Time
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
