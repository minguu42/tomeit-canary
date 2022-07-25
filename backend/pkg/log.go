package tomeit

import (
	"log"
	"os"
)

var (
	infoLogger  = log.New(os.Stdout, "[INFO] ", log.LstdFlags)
	errorLogger = log.New(os.Stderr, "[ERROR] ", log.LstdFlags)
	fatalLogger = log.New(os.Stderr, "[FATAL] ", log.LstdFlags)
)

// LogInfo は後から解析に有用なアプリケーション情報をログに出力する。
func LogInfo(v ...interface{}) {
	infoLogger.Println(v...)
}

// LogError はアプリケーションを継続して動作させられるが、予期しない事象の情報をログに出力する。
func LogError(v ...interface{}) {
	errorLogger.Println(v...)
}

// LogFatal はアプリケーションを継続して動作させれらない事象の情報をログに出力し、プログラムを終了する。
func LogFatal(v ...interface{}) {
	fatalLogger.Fatalln(v...)
}
