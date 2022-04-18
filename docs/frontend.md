# Next.js App 設計

## 技術スタック

- プログラミング言語: TypeScript
- ライブラリ・フレームワーク: React、Next.js
- 状態管理: Recoil、SWR
- スタイリング: CSS Modules
- フォーマッタ・リンタ: Prettier、ESLint、Stylelint
- テスト: Jest、React Testing Library
- タスクランナー: GNU Make
- デプロイ: Vercel

## コンポーネントのディレクトリ構成

- コンポーネントは `src/components` 直下の `pages`、`models`、`common`、`functional` ディレクトリに分類し、管理する。
- `pages` ... **1つのページを表す**コンポーネントを格納する。`src/pages` ではルーティングのみを行い、`components/pages` では実際のコンテンツを記述する。
- `models` ... **モデルに関心を持つ**コンポーネントを格納する。
- `common` ... **ページを横断する**、もしくは**モデルに関心を持たず見た目を伴う**コンポーネントを格納する。
- `functional` ... **見た目を伴わず、機能だけを持つ**コンポーネントを格納する。

### なぜ？

コンポーネントのディレクトリ構成を考える上で重視している点は以下の2点である。

1. **コンポーネントの分類 (どこに分類するか、どこにあるか) が明確であること**
2. **コンポーネントの責務 (何のコンポーネントか、何をするのか) が明確であること**

`pages` はファイル名と URL を一致させる必要がなくなり、全てのコンポーネントを `src/components` 以下に格納するために使用する。
`models` はアプリケーションからそのモデルが不要になった場合にディレクトリごと消せ、コンポーネントの責務を明確にする。

## 状態管理

- 状態は **Server Data State**、**Global State**、**Local State** に分ける。
- **外部のサーバを叩き、取得するデータの状態**は Server Data State に当たる。
  - Server Data State は **SWR** で管理する。
- **ページを跨いで保持する状態**は Global State に当たる。
  - Global State は **Recoil** で管理する。
  - Global State は `src/globalStates` ディレクトリにファイルを作成し、定義する。
  - ファイル名は`xxxAtom.ts`のように `Atom` を接尾語としてつけ、Global State の key と一致させる。
  - ファイル内では読み込み用のフック `useXxxAtom` と書き込み用の関数を返すフック `useXxxMutators` をエクスポートする。
- **Server Data State、Global State に当たらない状態**は Local State に当たる。
  - Local State は **useState + バケツリレー** で管理する。
  - Local State は必要に応じて各コンポーネントで宣言する。

## スタイリング

- スタイリングは **CSS Modules** のみを使用し、純粋な CSS を書いていく。
- 複数のクラスを適用する、条件で分岐させる場合は **classnames** を使用する。
- スタイリング、コンポーネントの外部ライブラリは使用しない。
- UI デザインは **Material Design 3** を参考にする。

### なぜ？

スタイリングに CSS Modules を使用するのは単純に Web 標準の CSS を書きたいからである。
Tailwind CSS のような CSS フレームワークや Chakra UI のようなコンポーネントライブラリを使うことで簡単に素早くスタイリングできる。
しかし、細かいスタイルや挙動の変更は難しく、そのライブラリ独自の書き方を強いられる。
また、学習の面で言えばライブラリで CSS は隠蔽されており、将来が保証され、Web の根幹となる HTML、CSS を学べない。
そのため CSS Modules を使用し、ゴリゴリと標準の CSS を書いていくのである。
外部ライブラリを使わないのも同じ理由である。
個人プロダクトなのだから HTML と CSS による適切なマークアップ、スタイリングを学びながら、ゆっくりと進めれば良い。

UI デザインとして Material Design 3 を参考にするのは好みであるからである。

## 参考

- コンポーネントのディレクトリ構成
  - [SPA Componentの推しディレクトリ構成について語る](https://zenn.dev/yoshiko/articles/99f8047555f700)
- 状態管理
  - [「3種類」で管理するReactのState戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)
  - [Facebook製の新しいステート管理ライブラリ「Recoil」を最速で理解する](https://blog.uhy.ooo/entry/2020-05-16/recoil-first-impression/)
  - [Recoil Project Structure Best Practices](https://wes-rast.medium.com/recoil-project-structure-best-practices-79e74a475caa)
