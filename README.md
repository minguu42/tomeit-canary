# tomeit

`tomeit` は「集中力と時間を管理する」をコンセプトにしたタスク管理アプリです.
ポモドーロ・テクニックという時間管理法を取り入れ, 自身の集中力と時間を意識して行動できます.

## セットアップ

1. `.env.local`ファイルを作成する

% ユーザ認証に Firebase Authentication を使用しています. そのため動かすには Firebase プロジェクトを作成し, アプリを追加する必要があります.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=<firebase api key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<firebase auth domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<firebase project id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<firebase storage bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<firebase sender id>
NEXT_PUBLIC_FIREBASE_APP_ID=<firebase app id>

NEXT_PUBLIC_API_URL=http://localhost:8080
```

2. コマンドの実行

```bash
npm run dev
```

## 開発環境

- プログラミング言語：TypeScript
- ライブラリ・フレームワーク：React, Next.js
- スタイリング：CSS Modules + Sass
- 状態管理：useContext
- デプロイ：Vercel
- フォーマッタ・リンタ：Pritter, ESLint, stylelint

### 自動整形

```bash
npm run fmt
```

### 静的解析

```bash
npm run lint
```

### ローカル実行

```bash
npm run dev
```
