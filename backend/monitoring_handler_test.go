package tomeit

import (
	"net/http"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestGetHealthz(t *testing.T) {
	t.Run("サーバが動いていることを確かめる", func(t *testing.T) {
		resp, body := doTestRequest(t, "GET", "/v0/healthz", nil, nil, "healthzResponse")

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Status code should be %v, but %v", http.StatusOK, resp.StatusCode)
		}

		got, ok := body.(healthzResponse)
		if !ok {
			t.Fatal("Type Assertion failed.")
		}
		want := healthzResponse{
			Status: "OK",
		}
		if diff := cmp.Diff(got, want, nil); diff != "" {
			t.Errorf("getHealthz response mismatch (-got +want):\n%s", diff)
		}
	})
}
