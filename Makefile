.DEFAULT_GOAL := help

.PHONY: dev
dev:  ## http://localhost:3000 で開発用サーバを起動し、そのページを開く
	@open http://localhost:3000/
	@npm run dev

.PHONY: dev-backend
dev-backend:  ## 開発用 API サーバを起動する
	@docker compose --env-file ./.env.development.local up api

.PHONY: docs
docs: ## http://localhost:8000 でドキュメント用サーバを起動し、そのページを開く
	@open http://localhost:8000/
	@docker compose --env-file ./.env.development.local up -d docs

.PHONY: build
build:  ## ビルドする
	@npm run build

.PHONY: start
start:  ## 本番サーバを起動する
	@npm run start

.PHONY: fmt
fmt:  ## js, ts, jsx, tsx, css, json, md ファイルを自動整形する
	@npm run fmt

.PHONY: lint
lint:  ## js, ts, jsx, tsx, css ファイルを静的解析する
	@npm run lint

.PHONY: down
down:  ## 関連する Docker コンテナを停止し, 削除する
	@docker compose --env-file ./.env.development.local down

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
