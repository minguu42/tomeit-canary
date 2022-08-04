import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import GoogleLoginButton from "@/components/common/GoogleLoginButton/GoogleLoginButton";
import s from "./Landing.module.css";
import { imageLoader } from "@/lib/loader";

export const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>tomeit</title>
        <meta
          name="description"
          content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
        />
      </Head>

      <main className={s.container}>
        <h1 className={s.catch}>やるべきことに集中する</h1>
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
            loader={imageLoader}
            unoptimized={true}
          />
        </div>
      </main>
    </>
  );
};

export default Landing;
