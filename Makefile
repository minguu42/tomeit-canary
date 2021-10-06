.DEFAULT_GOAL := help

.PHONY: dev
dev:  ## フロントエンドとバックエンドの開発用サーバを起動する
	@docker compose --env-file ./.env.local up -d api
	@next dev

.PHONY: dev-f
dev-f:  ## フロントエンドの開発用サーバを起動する
	@next dev

.PHONY: dev-b
dev-b:  ## バックエンドの開発用サーバを起動する.
	@docker compose --env-file ./.env.local up api

.PHONY: build
build:  ## ビルドする
	@next build

.PHONY: start
start:  ## 本番サーバを起動する
	@next start

.PHONY: fmt
fmt:  ## Prettier, stylelint による自動整形を実行する
	@prettier --ignore-path ./.gitignore -l -w "**/*.{js,jsx,ts,tsx,scss,json,md}"
	@stylelint --fix --ignore-path ./.gitignore "**/*.scss"

.PHONY: lint
lint:  ## ESLint, stylelint による静的解析を実行する
	@next lint
	@stylelint --ignore-path ./.gitignore "**/*.scss"

.PHONY: test
test:  ## Jest でテストを実行する
	@jest

.PHONY: check
check: ## fmt, lint, test を実行し, 適切な状態か確認する
	@make fmt
	@make lint
	@make test

.PHONY: down
down:  ## Docker コンテナを停止し, 削除する
	@docker compose --env-file ./.env.local down

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'
