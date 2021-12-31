import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import TopAppBar from "@/components/common/TopAppBar";
import GoogleLoginButton from "@/components/common/GoogleLoginButton/GoogleLoginButton";
import s from "./Landing.module.css";

export const Landing: NextPage = () => (
  <div className={s.container}>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
      />
    </Head>

    <TopAppBar />
    <main className={s.inner}>
      <h1 className={s.catch}>やるべきことのみに集中する</h1>
      <p className={s.description}>
        tomeit
        は必要なことだけに集中するためのタスク管理アプリです。今やるべきことのみに集中し、淡々とタスクをこなしましょう！
      </p>
      <div className={s.buttonLayout}>
        <GoogleLoginButton />
      </div>
      <div className={s.imageLayout}>
        <Image
          src="/images/work_from_home.png"
          width={480}
          height={340}
          alt=""
        />
      </div>
    </main>
  </div>
);

export default Landing;
