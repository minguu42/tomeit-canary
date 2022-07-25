package tomeit

import "net/http"

// GetHealthz は"GET /healthz"に対応するハンドラ
func GetHealthz(w http.ResponseWriter, _ *http.Request) {
	if err := writeResponse(w, 200, &healthzResponse{Status: "OK"}); err != nil {
		writeErrorResponse(w, newErrInternalServerError(err))
		LogError("failed to write response.", err)
	}
}
