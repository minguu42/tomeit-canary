.DEFAULT_GOAL := help

.PHONY: dev
dev:  ## フロントエンドとバックエンドの開発用サーバを起動する
	@docker compose --env-file ./.env.development.local up -d api
	@open http://localhost:3000/
	@next dev

.PHONY: dev-f
dev-f:  ## フロントエンドの開発用サーバを起動する
	@next dev

.PHONY: dev-b
dev-b:  ## バックエンドの開発用サーバを起動する
	@docker compose --env-file ./.env.development.local up api

.PHONY: docs
docs: ## http://localhost:8000 で仕様書を表示するサーバを起動する
	@docker compose --env-file ./.env.development.local up -d docs

.PHONY: build
build:  ## ビルドする
	@next build

.PHONY: start
start:  ## 本番サーバを起動する
	@next start

.PHONY: fmt-f
fmt-f:  ## Prettier, stylelint による自動整形を実行する
	@prettier --ignore-path ./.lintignore -l -w "**/*.{js,jsx,ts,tsx,scss,json,md}"

.PHONY: fmt-b
fmt-b:  ## gofmt, goimports による自動整形を実行する
	@cd backend && \
	gofmt -l -s -w . && \
	goimports -w .

.PHONY: lint-f
lint-f:  ## ESLint, stylelint による静的解析を実行する
	@next lint

.PHONY: lint-b
lint-b:  ## govet, staticcheck による静的解析を実行する
	@cd backend && \
	go vet ./... && \
	staticcheck ./...

.PHONY: test-f
test-f:  ## Jest でテストを実行する
	@jest

.PHONY: test-b
test-b:  ## バックエンドのテストを実行する
	@docker compose --env-file ./.env.development.local up -d db-test
	@cd backend && \
	go test

.PHONY: check-f
check-f:  ## fmt-f, lint-f, test-f を実行する
	@$(MAKE) fmt-f
	@$(MAKE) lint-f
	@$(MAKE) test-f

.PHONY: check-b
check-b:  ## fmt-b, lint-b, test-b を実行する
	@$(MAKE) fmt-b
	@$(MAKE) lint-b
	@$(MAKE) test-b

.PHONY: cover-b
cover-b:  ## テストカバレッジを測定する
	@cd backend && \
	go test -coverprofile=coverage.out && \
	go tool cover -func=coverage.out

.PHONY: bench-b
bench-b:  ## ベンチマークを測定する
	@cd backend && \
	go test -bench .

.PHONY: down
down:  ## 関連する Docker コンテナを停止し, 削除する
	@docker compose --env-file ./.env.development.local down

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'
