# tomeit API

`tomeit API` は tomeit のバックエンドとなる REST API です.

[TODO: GitHub Pages で Swagger UI をホスティングしたら追加する]: <> (## ドキュメント)

[comment]: <> (この API のエンドポイントは[こちら]&#40;GitHub Pages の URL&#41;に載っています.)

## 開発環境

- プログラミング言語：Go
- ライブラリ・フレームワーク：chi
- デプロイ：Heroku
- フォーマッタ・リンタ：gofmt, goimports, govet, staticcheck
- テスト：testing, net/http/httptest

### 自動整形

```bash
make fmt
```

### 静的解析

```bash
make lint
```

### テスト

```bash
make test
```

### ローカル実行

```bash
make dev
# 終了時
make down
```
