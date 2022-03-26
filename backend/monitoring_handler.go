package tomeit

import "net/http"

type healthzResponse struct {
	Status string `json:"status"`
}

func getHealthz(w http.ResponseWriter, _ *http.Request) {
	_ = writeResponse(w, http.StatusOK,
		healthzResponse{
			Status: "OK",
		})
}
