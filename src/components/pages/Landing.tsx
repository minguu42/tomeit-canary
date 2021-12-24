import type { NextPage } from "next";
import Head from "next/head";

const Landing = (): JSX.Element => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
      />
    </Head>

    <p>Start from now!</p>
  </>
);

const LandingContainer: NextPage = () => {
  return <Landing />;
};

export default LandingContainer;
