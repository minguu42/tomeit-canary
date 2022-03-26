FROM golang:1.17.7-bullseye

WORKDIR /app
COPY . .

RUN go mod tidy && \
    go install github.com/cosmtrek/air@v1.27.10

CMD ["air", "-c", "./build/.air.toml"]
