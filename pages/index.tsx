import { VFC } from "react";
import Head from "next/head";

import styles from "styles/pages/Home.module.scss";
import Header from "components/Header";
import Footer from "components/Footer";

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
    <main className={styles.main}>
      <div className={styles.catch}>
        <h3 className={styles.heading}>大事なことに集中する</h3>
        <p className={styles.description}>
          tomeit は大事なことに集中するためのタスク管理アプリです。
          <br />
          ポモドーロテクニックを使って、時間と集中力を有意義に使いましょう！
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
