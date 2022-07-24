package tomeit

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// writeResponse はレスポンスにステータスコード、JSONデータを書き込む。
func writeResponse(w http.ResponseWriter, statusCode int, body interface{}) error {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")

	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(body); err != nil {
		return fmt.Errorf("failed to encode response. %w", err)
	}
	return nil
}

// writeErrorResponse はエラー時のレスポンスにステータスコード、JSONデータを書き込む。
func writeErrorResponse(w http.ResponseWriter, response *httpErrorResponse) {
	w.WriteHeader(response.StatusCode)
	w.Header().Set("Content-Type", "application/json")

	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	_ = encoder.Encode(response)
}
