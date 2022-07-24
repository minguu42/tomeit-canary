package tomeit

import (
	"net/http"

	"github.com/minguu42/tomeit/pkg/logging"
)

// GetHealthz は"GET /healthz"に対応するハンドラ
func GetHealthz(w http.ResponseWriter, _ *http.Request) {
	if err := writeResponse(w, 200, &healthzResponse{Status: "OK"}); err != nil {
		writeErrorResponse(w, newErrInternalServerError(err))
		logging.Error("failed to write response.", err)
	}
}
