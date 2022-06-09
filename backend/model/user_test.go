package model

import "testing"

func TestUser_HasTask(t *testing.T) {
	type args struct {
		u *User
		t *Task
	}

	testcases := []struct {
		args args
		want bool
	}{
		{args{u: &User{ID: 1}, t: &Task{UserID: 1}}, true},
		{args{u: &User{ID: 1}, t: &Task{UserID: 2}}, false},
		{args{u: &User{ID: 0}, t: &Task{UserID: 0}}, false},
		{args{u: &User{ID: -1}, t: &Task{UserID: -1}}, false},
	}

	for i, tc := range testcases {
		if got := tc.args.u.HasTask(tc.args.t); got != tc.want {
			t.Errorf("#%d: got %v want %v", i+1, got, tc.want)
		}
	}
}
