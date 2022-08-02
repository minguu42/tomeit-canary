package tomeit

import "net/http"

// HealthCheck は"GET /healthz"に対応するハンドラ
func HealthCheck(w http.ResponseWriter, _ *http.Request) {
	if err := writeResponse(w, 200, &healthCheckResponse{Status: "OK"}); err != nil {
		writeErrorResponse(w, newErrInternalServerError(err))
		LogError("failed to write response.", err)
	}
}
