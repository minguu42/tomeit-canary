.DEFAULT_GOAL := help

.PHONY: dev
dev:  ## http://localhost:8080 で開発用 API サーバを起動する
	@docker compose --env-file ../.env.development -f ../docker-compose.yaml up api

.PHONY: docs
docs: ## http://localhost:8000 でドキュメント用サーバを起動する
	@open http://localhost:8000/
	@docker compose --env-file ../.env.development -f ../docker-compose.yaml up -d docs

.PHONY: fmt
fmt:  ## Go ファイルを自動整形する
	@gofmt -l -s -w .
	@goimports -w .

.PHONY: lint
lint:  ## Go ファイルを静的解析する
	@go vet ./...
	@staticcheck ./...

.PHONY: test
test: ## Go ファイルをテストする
	@docker compose --env-file ../.env.development -f ../docker-compose.yaml up -d db-test
	@go test ./...

.PHONY: down
down:  ## 関連する Docker コンテナを停止し, 削除する
	@docker compose --env-file ../.env.development -f ../docker-compose.yaml down

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
