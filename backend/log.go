package tomeit

import (
	"io"
	"log"
	"os"
)

func InitLogger(isEnabled bool) {
	out := io.Discard
	if isEnabled {
		out = os.Stderr
	}

	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetOutput(out)
}
