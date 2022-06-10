package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// writeResponse はレスポンスにステータスコード、JSON データを書き込む。
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

//// writeErrorResponse はレスポンスにステータスコード、JSON データを書き込む。
//func writeErrorResponse(w http.ResponseWriter, resp *model.HTTPErrorResponse) error {
//	w.WriteHeader(resp.StatusCode)
//	w.Header().Set("Content-Type", "application/json")
//
//	encoder := json.NewEncoder(w)
//	encoder.SetIndent("", "  ")
//	if err := encoder.Encode(resp); err != nil {
//		return fmt.Errorf("failed to encode error response. %w", err)
//	}
//	return nil
//}
