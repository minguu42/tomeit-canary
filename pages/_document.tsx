import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {/* TODO: 検索結果に表示されるのを防ぐ. リリース時には削除する. */}
          <meta name="robots" content="noindex, nofollow" />

          <link
            rel="icon"
            href="/favicon.ico"
            sizes="48x48"
            type="image/vnd.microsoft.icon"
          />
          <link
            rel="icon"
            href="/icon192.png"
            sizes="192x192"
            type="image/png"
          />
          <link rel="apple-touch-icon-precomposed" href="/icon180.png" />
          {/*<meta name="msapplication-TileImage" content="画像 URL" />*/}
          {/*<meta name="msapplication-TileColor" content="カラーコード（例：#F89174）" />*/}

          {/*<meta property="og:url" content="" />*/}
          <meta property="og:title" content="大事なことに集中する" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="tomeit は「大事なことに集中する」をコンセプトにしたタスク管理アプリです。ポモドーロテクニックを使用し, 時間と集中力を有意義に使いましょう！"
          />
          <meta property="og:image" content="/ogp_image.png" />
          <meta property="og:site_name" content="tomeit" />
          <meta property="og:locale" content="ja_JP" />

          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
