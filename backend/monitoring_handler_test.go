package tomeit

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestGetHealth(t *testing.T) {
	setupTestDB(t)
	t.Cleanup(teardownTestDB)
	t.Run("ヘルスチェックを行う", func(t *testing.T) {
		resp, body := doTestRequest(t, "GET", "/v0/health", nil, nil, "healthResponse")

		checkStatusCode(t, resp, 200)

		got, ok := body.(healthResponse)
		if !ok {
			t.Fatal("Type Assertion failed.")
		}
		want := healthResponse{
			Status: "OK",
		}
		if diff := cmp.Diff(got, want, nil); diff != "" {
			t.Errorf("getHealth response mismatch (-got +want):\n%s", diff)
		}
	})
}
