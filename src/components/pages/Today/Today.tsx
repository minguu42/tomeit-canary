import type { NextPage } from "next";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import s from "./Today.module.css";
import { useRequiredLogin } from "@/lib/auth";

export const Today: NextPage = () => {
  useRequiredLogin();

  return (
    <>
      <Head>
        <title>今日 - tomeit</title>
      </Head>

      <main className={s.container}>
        <PomodoroTimer />
        <div className={s.taskField}>
          <TaskAddForm />
          <TaskList filter="today" />
        </div>
      </main>
    </>
  );
};

export default Today;
