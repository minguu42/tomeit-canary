package tomeit

import (
	"net/http"
)

type healthResponse struct {
	Status string `json:"status"`
	Error  string `json:"error,omitempty"`
}

func getHealth(w http.ResponseWriter, _ *http.Request) {
	body := healthResponse{
		Status: "OK",
	}

	writeResponseBody(w, body)
	return
}
