package logger

import (
	"log"
	"os"
)

var (
	Error *log.Logger
	Info  *log.Logger
	DEBUG *log.Logger
)

func InitLogger() {
	Error = log.New(os.Stderr, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
	Info = log.New(os.Stdout, "INFO : ", log.Ldate|log.Ltime|log.Lshortfile)
	Error = log.New(os.Stdout, "DEBUG: ", log.Ldate|log.Ltime|log.Lshortfile)
}
