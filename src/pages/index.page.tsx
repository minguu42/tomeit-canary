import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import DrawerLayout from "components/common/DrawerLayout";
import CatchMessage from "./CatchMessage";
import GoogleLoginButton from "./GoogleLoginButton";
import s from "./styles.module.scss";
import { useLoggedInAlready } from "lib/auth";

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
  useLoggedInAlready();

  return <Landing />;
};

export default LandingContainer;
