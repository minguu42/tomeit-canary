package model

import "net/http"

type HTTPErrorResponse struct {
	Error      error `json:"-"`
	StatusCode int   `json:"-"`

	Description  string `json:"description"`
	ErrorMessage string `json:"error"`
}

func NewErrBadRequest(err error) *HTTPErrorResponse {
	return &HTTPErrorResponse{
		Error:        err,
		StatusCode:   http.StatusBadRequest,
		Description:  "リクエストに何らかの誤りがあります。内容を確かめてからもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}

func NewErrUnauthorized(err error) *HTTPErrorResponse {
	return &HTTPErrorResponse{
		Error:        err,
		StatusCode:   http.StatusUnauthorized,
		Description:  "ユーザの認証に失敗しました。ログイン後にもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}

func NewErrNotFound(err error) *HTTPErrorResponse {
	return &HTTPErrorResponse{
		Error:        err,
		StatusCode:   http.StatusNotFound,
		Description:  "指定したリソースが存在しません。",
		ErrorMessage: err.Error(),
	}
}

func NewErrInternalServerError(err error) *HTTPErrorResponse {
	return &HTTPErrorResponse{
		Error:        err,
		StatusCode:   http.StatusInternalServerError,
		Description:  "サーバで何らかのエラーが発生しました。時間を置いてからもう一度お試し下さい。",
		ErrorMessage: err.Error(),
	}
}
