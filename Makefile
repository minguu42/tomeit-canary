.DEFAULT_GOAL := help

.PHONY: dev
dev:  ## フロントエンドの開発用サーバを起動する
	@open http://localhost:3000/
	@next dev

.PHONY: docs
docs: ## http://localhost:8000 で仕様書を表示するサーバを起動する
	@docker compose --env-file ./.env.development.local up -d docs

.PHONY: build
build:  ## ビルドする
	@next build

.PHONY: start
start:  ## 本番サーバを起動する
	@next start

.PHONY: fmt
fmt:  ## Prettier, stylelint による自動整形を実行する
	@prettier --ignore-path ./.lintignore -l -w "**/*.{js,jsx,ts,tsx,css,json,md}"
	@stylelint --fix --ignore-path ./.lintignore "**/*.css"

.PHONY: lint
lint:  ## ESLint, stylelint による静的解析を実行する
	@next lint
	@stylelint --ignore-path ./.lintignore "**/*.css"

.PHONY: check
check:  ## fmt-f, lint-f, test-f を実行する
	@$(MAKE) fmt-f
	@$(MAKE) lint-f
	@$(MAKE) test-f

.PHONY: storybook
storybook:  ## Storybook を立ち上げる
	@start-storybook -p 6006

.PHONY: build-storybook
build-storybook:  ## Storybook をビルドする
	build-storybook

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
	@$(MAKE) fmt-b
	@$(MAKE) lint-b
	@$(MAKE) test-b

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
