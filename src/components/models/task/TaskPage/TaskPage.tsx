import { FC } from "react";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import TaskSideSheet from "@/components/models/task/TaskSideSheet";
import s from "./TaskPage.module.css";
import { useRequiredLogin } from "@/components/functional/Auth";

type Props = {
  title: string;
  filter: "today" | "tomorrow" | "someday";
};

const TaskPage: FC<Props> = ({ title, filter }) => {
  useRequiredLogin();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={s.container}>
        <main className={s.main}>
          <PomodoroTimer />
          <div className={s.mt24} />
          <TaskAddForm />
          <TaskList filter={filter} />
        </main>
        <TaskSideSheet />
      </div>
    </>
  );
};

export default TaskPage;
