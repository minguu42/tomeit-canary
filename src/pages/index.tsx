import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Header from "components/common/Header";
import CatchMessage from "components/landing/CatchMessage";
import GoogleLoginButton from "components/landing/GoogleLoginButton";
import styles from "pages/Landing.module.scss";
import { useAuth } from "lib/AuthContext";

const Landing = (): JSX.Element => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみを行い, 時間を有意義に使いましょう！"
      />
    </Head>

    <Header />
    <main className={styles.main}>
      <div className={styles.leftWrapper}>
        <CatchMessage />
        <GoogleLoginButton />
      </div>
      <div>
        <Image
          src="/work_from_home.png"
          alt="work image"
          width={480}
          height={340}
        />
      </div>
    </main>
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

  return <Landing />;
};

export default LandingContainer;
