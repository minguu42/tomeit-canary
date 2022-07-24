package tomeit

// httpErrorResponse はエラーレスポンスを表す構造体
// Description はユーザに表示するエラーの大まかな内容である。
// ErrorMessage は開発者に表示するエラーの具体的な内容である。
type httpErrorResponse struct {
	Error      error `json:"-"`
	StatusCode int   `json:"-"`

	Description  string `json:"description"`
	ErrorMessage string `json:"error"`
}

func newErrInternalServerError(err error) *httpErrorResponse {
	return &httpErrorResponse{
		Error:        err,
		StatusCode:   500,
		Description:  "サーバで何らかのエラーが発生しました。時間をおいてからもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}
