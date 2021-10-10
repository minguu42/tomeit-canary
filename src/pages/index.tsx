import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import DrawerLayout from "components/common/DrawerLayout";
import CatchMessage from "components/landing/CatchMessage";
import GoogleLoginButton from "components/landing/GoogleLoginButton";
import s from "./styles.module.scss";
import { useUser } from "lib/auth";

const Landing = (): JSX.Element => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
      />
    </Head>

    <DrawerLayout>
      <div className={s.mainLayout}>
        <div className={s.leftWrapper}>
          <CatchMessage />
          <GoogleLoginButton />
        </div>
        <div className={s.imageContainer}>
          <Image
            src="/work_from_home.png"
            alt="work image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </DrawerLayout>
  </>
);

const LandingContainer: NextPage = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user !== null) {
      void router.push("/tasks/today");
    }
  }, [router, user]);

  return <Landing />;
};

export default LandingContainer;
