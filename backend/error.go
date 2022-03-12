package tomeit

import "net/http"

type ErrResponse struct {
	Err        error `json:"-"`
	StatusCode int   `json:"-"`

	StatusText string `json:"status"`
	ErrorText  string `json:"error,omitempty"`
}

func newErrInvalidRequest(err error) *ErrResponse {
	return &ErrResponse{
		Err:        err,
		StatusCode: http.StatusBadRequest,
		StatusText: "リクエストに何らかの間違いがあります。",
		ErrorText:  err.Error(),
	}
}

func newErrAuthentication(err error) *ErrResponse {
	return &ErrResponse{
		Err:        err,
		StatusCode: http.StatusUnauthorized,
		StatusText: "ログインする必要があります。",
		ErrorText:  err.Error(),
	}
}

//func newErrNotFound(err error) *ErrResponse {
//	return &ErrResponse{
//		Err:        err,
//		StatusCode: http.StatusNotFound,
//		StatusText: "指定されたリソースが存在しません。",
//		ErrorText:  err.Error(),
//	}
//}

func newErrRender(err error) *ErrResponse {
	return &ErrResponse{
		Err:        err,
		StatusCode: http.StatusUnprocessableEntity,
		StatusText: "レスポンスの生成に失敗しました。",
		ErrorText:  err.Error(),
	}
}

func newErrInternalServer(err error) *ErrResponse {
	return &ErrResponse{
		Err:        err,
		StatusCode: http.StatusInternalServerError,
		StatusText: "サーバ側で何らかの不具合が発生しました。",
		ErrorText:  err.Error(),
	}
}
