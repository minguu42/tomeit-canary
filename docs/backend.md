# Go REST API 設計

## 技術スタック

- プログラミング言語: Go
- ライブラリ・フレームワーク: chi、goqu
- フォーマッタ・リンタ: gofmt、goimports、govet、staticcheck
- テスト: testing、net/http/httptest
- タスクランナー: GNU Make
- デプロイ: Render

## ディレクトリ構成

### ハンドラ

- ハンドラファイルには以下のコードを書く。
  - リクエスト構造体
  - レスポンス構造体
  - ハンドラ関数
- リクエスト構造体はリクエストボディの JSON 構造を定義する。
- レスポンス構造体はレスポンスボディの JSON 構造を定義する。
- ハンドラファイル名は `<リソースの複数系>_handler.go` にする。
- リクエスト構造体名は `<ハンドラ関数名>Request` にする。
- レスポンス構造体名は `<リソース名>Response` にする。
- ハンドラ関数名は `<リクエストメソッド><URL に対応したリソース名>` にする。

### モデル

- モデルファイルは `<リソースの単数系>.go` にする。

### データベース

- `getUsersByID`
- `getUserByID`
- `createUser`
- `updateUser`
- `destroyUser`

## エラーハンドリング

- 標準の `errors` パッケージを使用する。
- エラーハンドリングとして「上流に伝搬」、「ログに出力」、「panic」を行う。
  - `main` 関数では panic を行う。
  - ハンドラ関数ではログに出力を行う。
  - それ以外の関数、メソッドでは `fmt.Errorf()` でエラーをラップして上流に伝搬する。

## ロギング

- 標準の `log` パッケージを使用する。
- ログの出力先は `標準出力`、`標準エラー出力`を使用する。
- ログレベルは `Error`、`Debug` を使用する。
  - `Error` はアプリケーションがエラーで終了したことを示す。
  - `Debug` は開発時やバグの修正時に動作を追跡するために必要な文脈情報を示す。

## 参考

- エラーハンドリング
  - [Go エラーハンドリング戦略](https://zenn.dev/nobonobo/articles/0b722c9c2b18d5)
  - [今 Go のエラーハンドリングを無難にしておく方法 (2021.09 現在)](https://zenn.dev/nekoshita/articles/097e00c6d3d1c9)
- ロギング
  - [Go のロギングライブラリ 2021 年冬](https://moriyoshi.hatenablog.com/entry/2021/12/14/183703)