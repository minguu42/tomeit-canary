package tomeit

import (
	"net/http"

	"github.com/minguu42/tomeit/logger"
)

type healthResponse struct {
	Status string `json:"status"`
	Error  string `json:"error,omitempty"`
}

func getHealth(w http.ResponseWriter, _ *http.Request) {
	body := healthResponse{
		Status: "OK",
	}
	if err := writeResponse(w, http.StatusOK, body); err != nil {
		logger.Error.Println("writeResponse failed:", err)
		// TODO: エラーレスポンスの作成
		return
	}
	return
}
