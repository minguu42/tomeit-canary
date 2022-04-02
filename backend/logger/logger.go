package logger

import (
	"io"
	"log"
	"os"
)

var (
	Error *log.Logger
	Info  *log.Logger
	Debug *log.Logger
)

func InitLogger(isErrorEnabled, isInfoEnabled, isDebugEnabled bool) {
	var (
		errorOut io.Writer = os.Stderr
		infoOut  io.Writer = os.Stdout
		debugOut io.Writer = os.Stdout
	)
	if !isErrorEnabled {
		errorOut = io.Discard
	}
	if !isInfoEnabled {
		infoOut = io.Discard
	}
	if !isDebugEnabled {
		debugOut = io.Discard
	}

	Error = log.New(errorOut, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
	Info = log.New(infoOut, "INFO : ", log.Ldate|log.Ltime|log.Lshortfile)
	Debug = log.New(debugOut, "DEBUG: ", log.Ldate|log.Ltime|log.Lshortfile)
}
