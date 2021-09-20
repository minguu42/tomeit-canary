import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import TopAppBar from "components/common/TopAppBar";
import HomeHeading from "components/home/HomeHeading";
import AddTaskForm from "components/home/AddTaskForm";
import TaskList from "components/home/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";
import styles from "./styles.module.scss";
import { useAuth } from "contexts/AuthContext";

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading />
      <div className={styles.taskListLayout}>
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={styles.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      router.push("/").catch((error) => {
        console.error(error);
        window.alert("エラーが発生しました.");
      });
    }
  });

  return <Home />;
};

export default HomeContainer;
