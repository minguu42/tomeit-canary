.DEFAULT_GOAL := help

dev:  ## http://localhost:8080で開発用 API サーバを起動する
	@docker compose --env-file ../.env.development -f ../docker-compose.yml up api

docs: ## http://localhost:8000でドキュメント用サーバを起動する
	@open http://localhost:8000/
	@docker compose --env-file ../.env.development -f ../docker-compose.yml up -d docs

fmt:  ## Goファイルを自動整形する
	@gofmt -l -s -w .
	@goimports -w .

lint:  ## Goファイルを静的解析する
	@go vet ./...
	@staticcheck ./...

test: ## Goファイルをテストする
	@docker compose --env-file ../.env.development -f ../docker-compose.yml up -d db-test
	@go test -shuffle on ./...

down:  ## 関連するDockerコンテナを停止し, 削除する
	@docker compose --env-file ../.env.development -f ../docker-compose.yml down

help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: dev docs fmt lint test down help
