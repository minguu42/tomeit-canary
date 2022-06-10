// Package utils はハンドラ関連のユーティリティ関数を定義するパッケージ
package utils

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/minguu42/tomeit/internal/model"
)

// WriteResponse はレスポンスにステータスコード、JSON データを書き込む。
func WriteResponse(w http.ResponseWriter, statusCode int, body interface{}) error {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")

	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(body); err != nil {
		return fmt.Errorf("failed to encode response. %w", err)
	}
	return nil
}

// WriteErrorResponse はレスポンスにステータスコード、JSON データを書き込む。
func WriteErrorResponse(w http.ResponseWriter, resp *model.HTTPErrorResponse) {
	w.WriteHeader(resp.StatusCode)
	w.Header().Set("Content-Type", "application/json")

	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	_ = encoder.Encode(resp)
}