import { NextPage } from "next";
import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import TaskListHeader from "components/common/TaskListHeader";
import AddTaskForm from "components/common/AddTaskForm";
import s from "./styles.module.scss";
import TaskList from "components/common/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";

const Today: NextPage = () => (
  <>
    <Head>
      <title>今日 - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={s.main}>
      <TaskListHeader />
      <div className={s.listLayout}>
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={s.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

export default Today;
