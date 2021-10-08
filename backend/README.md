# tomeit API

`tomeit API` は tomeit のデータや処理を扱う REST API です.

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
