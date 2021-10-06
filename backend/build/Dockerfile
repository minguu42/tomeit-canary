FROM golang:1.16

WORKDIR /go/src/app
COPY ./backend .

RUN go get -d -v ./...

CMD ["go", "run", "./cmd/server"]
