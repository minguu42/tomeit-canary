import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "components/common/Header";
import Catch from "components/Catch";
import Footer from "components/common/Footer";
import styles from "pages/Landing.module.scss";
import { useAuth, login } from "lib/AuthContext";

type Props = {
  handleLogin: () => Promise<void>;
};

const Landing = ({ handleLogin }: Props): JSX.Element => (
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
      <Catch handleLogin={handleLogin} />
    </main>
    <Footer />
  </>
);

const LandingContainer = (): JSX.Element => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      router.push("/home").catch(() => window.alert("エラーが発生しました。"));
    }
  }, [router, currentUser]);

  const handleLogin = async () => {
    try {
      await login();
    } catch {
      window.alert("ログインに失敗しました。もう一度お試しください。");
    }
  };

  return <Landing handleLogin={handleLogin} />;
};

export default LandingContainer;
