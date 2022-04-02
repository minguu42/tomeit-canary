package tomeit

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// writeResponse はレスポンスのヘッダにステータスコード、ボディに JSON データを書き込む。
func writeResponse(w http.ResponseWriter, statusCode int, body interface{}) error {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(body); err != nil {
		return fmt.Errorf("encoder.Encode failed: %w", err)
	}
	return nil
}

// writeErrResponse はレスポンスに errResponse の内容を書き込む。
func writeErrResponse(w http.ResponseWriter, response *errResponse) error {
	w.WriteHeader(response.StatusCode)
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(response); err != nil {
		return fmt.Errorf("encoder.Encode failed: %w", err)
	}
	return nil
}
