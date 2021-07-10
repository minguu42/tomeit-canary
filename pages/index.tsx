import { VFC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "styles/pages/Home.module.scss";
import Header from "components/Header";
import Footer from "components/Footer";
import GoogleLoginButton from "components/GoogleLoginButton";
import { useAuth } from "lib/AuthContext";

type Props = {
  handleLogin: () => Promise<void>;
};

const Home: VFC<Props> = ({ handleLogin }) => (
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
      <GoogleLoginButton handleLogin={handleLogin} />
    </main>
    <Footer />
  </>
);

const HomeContainer: VFC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      if (login) {
        await login();
        await router.push("/"); //TODO: リダイレクト先 URL を /users にする
      }
    } catch {
      console.log("handleLogin error");
    }
  };

  return <Home handleLogin={handleLogin} />;
};

export default HomeContainer;
