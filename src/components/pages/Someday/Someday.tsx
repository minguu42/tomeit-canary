import type { NextPage } from "next";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import s from "./Someday.module.css";

export const Someday: NextPage = () => {
  return (
    <>
      <Head>
        <title>いつか - tomeit</title>
      </Head>

      <main className={s.container}>
        <PomodoroTimer />
        <div className={s.taskField}>
          <TaskAddForm />
          <TaskList />
        </div>
      </main>
    </>
  );
};

export default Someday;
