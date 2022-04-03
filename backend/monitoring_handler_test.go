package tomeit

import (
	"net/http"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestGetHealthz(t *testing.T) {
	var (
		method = http.MethodGet
		path   = "/v0/healthz"
		got    healthzResponse
	)
	t.Run("サーバが動いていることを確かめる", func(t *testing.T) {
		resp, err := doTestRequest(method, path, nil, nil, &got)
		if err != nil {
			t.Fatalf("doTestRequest failed: %v", err)
		}

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Status code should be %v, but %v", http.StatusOK, resp.StatusCode)
		}

		want := healthzResponse{
			Status: "OK",
		}
		if diff := cmp.Diff(got, want, nil); diff != "" {
			t.Errorf("getHealthz response mismatch (-got +want):\n%s", diff)
		}
	})
}
