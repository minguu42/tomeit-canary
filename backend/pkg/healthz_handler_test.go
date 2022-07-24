package tomeit

import (
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestGetHealthz(t *testing.T) {
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/healthz", nil)

	GetHealthz(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 {
		t.Errorf("got = %d, but want = %d", resp.StatusCode, 200)
	}

	want := healthzResponse{Status: "OK"}
	var got healthzResponse
	if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
		t.Fatalf("failed to decode response body. %v", err)
	}
	if diff := cmp.Diff(got, want); diff != "" {
		t.Errorf("healthz response body is mismatch (-got, +want):\n%s", diff)
	}
}
