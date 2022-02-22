package tomeit

import (
	"encoding/json"
	"log"
	"net/http"
)

// writeResponseBody はレスポンスボディに JSON データを書き込む
func writeResponseBody(w http.ResponseWriter, body interface{}) {
	w.Header().Set("Content-Type", "application/json")

	output, err := json.MarshalIndent(body, "", "  ")
	if err != nil {
		log.Fatal("構造体から JSON への書き換えの失敗") // TODO: エラー処理
	}
	if _, err := w.Write(output); err != nil {
		log.Fatal("レスポンスボディへの書き込みの失敗") // TODO: エラー処理
	}
}
