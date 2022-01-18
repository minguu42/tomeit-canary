.DEFAULT_GOAL := help
SCRIPT_PATH = $(PWD)/node_modules/.bin/

.PHONY: dev
dev:  ## フロントエンドの開発用サーバを起動する
	@open http://localhost:3000/
	@$(SCRIPT_PATH)next dev

.PHONY: docs
docs: ## http://localhost:8000 で仕様書を表示するサーバを起動する
	@docker compose --env-file ./.env.development.local up -d docs

.PHONY: build
build:  ## ビルドする
	@$(SCRIPT_PATH)next build

.PHONY: start
start:  ## 本番サーバを起動する
	@$(SCRIPT_PATH)next start

.PHONY: fmt
fmt:  ## js, ts, jsx, tsx, css, json, md ファイルを自動整形する
	@$(SCRIPT_PATH)prettier --ignore-path .lintignore -l -w "{src/**/*,*}.{js,ts,jsx,tsx,css,json,md}"
	@$(SCRIPT_PATH)stylelint --fix --ignore-path .lintignore "src/**/*.css"

.PHONY: lint
lint:  ## js, ts, jsx, tsx, css ファイルを静的解析する
	@$(SCRIPT_PATH)next lint
	@$(SCRIPT_PATH)stylelint --ignore-path .lintignore "src/**/*.css"

.PHONY: check
check:  ## fmt, lint, test を実行する
	@$(MAKE) fmt
	@$(MAKE) lint

.PHONY: storybook
storybook:  ## Storybook を立ち上げる
	@$(SCRIPT_PATH)start-storybook -p 6006

.PHONY: build-storybook
build-storybook:  ## Storybook をビルドする
	$(SCRIPT_PATH)build-storybook

.PHONY: dev-backend
dev-backend:  ## バックエンドの開発用サーバを起動する
	@docker compose --env-file ./.env.development.local up api

.PHONY: fmt-backend
fmt-backend:  ## gofmt, goimports による自動整形を実行する
	@cd backend && \
	gofmt -l -s -w . && \
	goimports -w .

.PHONY: lint-backend
lint-backend:  ## govet, staticcheck による静的解析を実行する
	@cd backend && \
	go vet ./... && \
	staticcheck ./...

.PHONY: test-backend
test-backend:  ## バックエンドのテストを実行する
	@docker compose --env-file ./.env.development.local up -d db-test
	@cd backend && \
	go test

.PHONY: check-backend
check-backend:  ## fmt-b, lint-b, test-b を実行する
	@$(MAKE) fmt-backend
	@$(MAKE) lint-backend
	@$(MAKE) test-backend

.PHONY: cover-backend
cover-backend:  ## テストカバレッジを測定する
	@cd backend && \
	go test -coverprofile=coverage.out && \
	go tool cover -func=coverage.out

.PHONY: bench-backend
bench-backend:  ## ベンチマークを測定する
	@cd backend && \
	go test -bench .

.PHONY: down
down:  ## 関連する Docker コンテナを停止し, 削除する
	@docker compose --env-file ./.env.development.local down

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
