import { VFC } from "react";
import Head from "next/head";

import Header from "components/Header";

const Home: VFC = () => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は「大事なことに集中する」をコンセプトとしたタスク管理アプリです。ポモドーロテクニックを使って、時間と集中力を有意義に使いましょう！"
      />
    </Head>

    <Header />
    <main>
      <h1>Hello, 世界！</h1>
    </main>
  </>
);

export default Home;
