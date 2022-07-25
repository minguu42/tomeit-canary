FROM golang:1.16.15

WORKDIR /app

RUN go mod tidy && \
    go install github.com/cosmtrek/air@v1.27.10

CMD ["air"]
