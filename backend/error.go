package tomeit

import "net/http"

type errResponse struct {
	Err        error `json:"-"`
	StatusCode int   `json:"-"`

	StatusText string `json:"status"`
	ErrorText  string `json:"error,omitempty"`
}

//func newErrBadRequest(err error) *errResponse {
//	return &errResponse{
//		Err:        err,
//		StatusCode: http.StatusBadRequest,
//		StatusText: "リクエストに何らかの間違いがあります。内容を確かめてからもう一度お試しください。",
//		ErrorText:  err.Error(),
//	}
//}

func newErrUnauthorized(err error) *errResponse {
	return &errResponse{
		Err:        err,
		StatusCode: http.StatusUnauthorized,
		StatusText: "ユーザの認証に失敗しました。ログイン後にもう一度お試しください。",
		ErrorText:  err.Error(),
	}
}

//func newErrForbidden(err error) *errResponse {
//	return &errResponse{
//		Err:        err,
//		StatusCode: http.StatusForbidden,
//		StatusText: "指定したリソースへのアクセスが許可されていません。",
//		ErrorText:  err.Error(),
//	}
//}

//func newErrNotFound(err error) *errResponse {
//	return &errResponse{
//		Err:        err,
//		StatusCode: http.StatusNotFound,
//		StatusText: "指定したリソースが存在しません。",
//		ErrorText:  err.Error(),
//	}
//}

func newErrInternalServerError(err error) *errResponse {
	return &errResponse{
		Err:        err,
		StatusCode: http.StatusInternalServerError,
		StatusText: "サーバで何らかのエラーが発生しました。時間を置いてからもう一度お試しください。",
		ErrorText:  err.Error(),
	}
}
