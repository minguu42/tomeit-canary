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

func newErrBadRequest(err error) *httpErrorResponse {
	return &httpErrorResponse{
		Error:        err,
		StatusCode:   400,
		Description:  "リクエストに何らかの誤りがあります。内容を確かめてからもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}

func newErrUnauthorized(err error) *httpErrorResponse {
	return &httpErrorResponse{
		Error:        err,
		StatusCode:   401,
		Description:  "ユーザの認証に失敗しました。もう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}

func newErrNotFound(err error) *httpErrorResponse {
	return &httpErrorResponse{
		Error:        err,
		StatusCode:   404,
		Description:  "指定したリソースが存在しません。",
		ErrorMessage: err.Error(),
	}
}

func newErrInternalServerError(err error) *httpErrorResponse {
	return &httpErrorResponse{
		Error:        err,
		StatusCode:   500,
		Description:  "サーバで何らかのエラーが発生しました。時間をおいてからもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}
