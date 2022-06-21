// Package log はロギングで使用する関数を定義するパッケージ
package log

import (
	"log"
	"os"
)

var (
	infoLogger  = log.New(os.Stdout, "[INFO] ", log.LstdFlags)
	errorLogger = log.New(os.Stderr, "[ERROR] ", log.LstdFlags)
	fatalLogger = log.New(os.Stderr, "[FATAL] ", log.LstdFlags)
)

// Info は後から解析に有用であるアプリケーション情報をログに出力する。
func Info(v ...interface{}) {
	infoLogger.Println(v...)
}

// Error はアプリケーションを継続して動作させられるが、予期しない事象の情報をログに出力する。
func Error(v ...interface{}) {
	errorLogger.Println(v...)
}

// Fatal はアプリケーションを継続して動作させられない予期しない事象の情報をログに出力する。
func Fatal(v ...interface{}) {
	fatalLogger.Fatalln(v...)
}
