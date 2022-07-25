.DEFAULT_GOAL := help

dev:  ## http://localhost:3000で開発用Webサーバを起動する
	@open http://localhost:3000/
	@npm run dev

dev-backend:  ## http://localhost:8080で開発用APIサーバを起動する
	@docker compose --env-file .env.development up api

docs: ## http://localhost:8000でドキュメント用サーバを起動する
	@open http://localhost:8000/
	@docker compose --env-file .env.development up -d docs

build:  ## Next.js アプリをビルドする
	@npm run build

fmt:  ## js, ts, jsx, tsx, json, mdファイルを自動整形する
	@npm run fmt

lint:  ## js, ts, jsx, tsxファイルを静的解析する
	@npm run lint

down:  ## 関連するDockerコンテナを停止し, 削除する
	@docker compose --env-file .env.development down

help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: dev dev-backend docs build start fmt lint down help
