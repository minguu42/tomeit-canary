import type { NextPage } from "next";
import Head from "next/head";

import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import s from "./Tasks.module.css";

export const Tasks: NextPage = () => (
  <>
    <Head>
      <title>Tasks - tomeit</title>
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

export default Tasks;
