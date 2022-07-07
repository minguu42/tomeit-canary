package handler

import (
	"encoding/json"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/minguu42/tomeit/pkg/model"
	"github.com/minguu42/tomeit/pkg/service"
)

func TestGetHealthz(t *testing.T) {
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/healthz", nil)

	h := New(&service.Mock{})
	h.GetHealthz(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 {
		t.Errorf("got = %v, want = %v", resp.StatusCode, 200)
	}

	var got model.HealthzResponse
	if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
		t.Fatalf("failed to decode response body. %v", err)
	}
	want := model.HealthzResponse{
		Status: "OK",
	}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got = %v, want = %v", got, want)
	}
}
