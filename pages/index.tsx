import { useEffect, VFC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "styles/pages/Home.module.scss";
import Catch from "components/Catch";
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

    <main className={styles.main}>
      <Catch />
      <GoogleLoginButton handleLogin={handleLogin} />
    </main>
  </>
);

const HomeContainer: VFC = () => {
  const router = useRouter();
  const { currentUser, login } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      router.push("/users").catch(() => window.alert("エラーが発生しました。"));
    }
  }, [router, currentUser]);

  const handleLogin = async () => {
    try {
      if (login) {
        await login();
      }
    } catch {
      window.alert("ログインに失敗しました。もう一度お試しください。");
    }
  };

  return <Home handleLogin={handleLogin} />;
};

export default HomeContainer;
