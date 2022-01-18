import { NextPage } from "next";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import s from "./Tomorrow.module.css";
import { useRequiredLogin } from "@/lib/auth";
import { useTasksActions } from "@/globalStates/tasksAtom";
import { useState } from "react";
import { Task } from "@/models/task";

export const Tomorrow: NextPage = () => {
  useRequiredLogin();
  const { replaceTask } = useTasksActions();
  const [featuredTask, setFeaturedTask] = useState<Task | null>(null);

  const onCompleteTaskButtonClick = (task: Task): void => {
    if (task === null) return;
    const newTask: Task = { ...task, isCompleted: true };
    replaceTask(task, newTask);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
  };

  return (
    <>
      <Head>
        <title>明日 - tomeit</title>
      </Head>

      <main className={s.container}>
        <PomodoroTimer />
        <div className={s.taskField}>
          <TaskAddForm />
          <TaskList
            filter="tomorrow"
            featuredTask={featuredTask}
            setFeaturedTask={setFeaturedTask}
            onCompleteTaskButtonClick={onCompleteTaskButtonClick}
          />
        </div>
      </main>
    </>
  );
};

export default Tomorrow;
