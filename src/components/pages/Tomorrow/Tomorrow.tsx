import type { NextPage } from "next";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import s from "./Tomorrow.module.css";
import { useRequiredLogin } from "@/lib/auth";

export const Tomorrow: NextPage = () => {
  useRequiredLogin();
  return (
    <>
      <Head>
        <title>明日 - tomeit</title>
      </Head>

      <main className={s.container}>
        <PomodoroTimer />
        <div className={s.taskField}>
          <TaskAddForm />
          <TaskList filter="tomorrow" />
        </div>
      </main>
    </>
  );
};

export default Tomorrow;
