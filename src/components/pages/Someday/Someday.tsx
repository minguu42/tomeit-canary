import { NextPage } from "next";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import TaskSideSheet from "@/components/models/task/TaskSideSheet";
import s from "./Someday.module.css";
import { useState } from "react";
import { Task } from "@/models/task";
import { useRequiredLogin } from "@/lib/auth";
import { useTasksActions } from "@/globalStates/tasksAtom";

export const Someday: NextPage = () => {
  useRequiredLogin();
  const { replaceTask, deleteTask } = useTasksActions();
  const [featuredTask, setFeaturedTask] = useState<Task | null>(null);

  const onDeleteTaskButtonClick = (task: Task): void => {
    if (task === null) return;
    deleteTask(task);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
  };

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
        <title>いつか - tomeit</title>
      </Head>

      <div className={s.container}>
        <main className={s.main}>
          <PomodoroTimer />
          <div className={s.mt24} />
          <TaskAddForm />
          <TaskList
            filter="someday"
            featuredTask={featuredTask}
            setFeaturedTask={setFeaturedTask}
            onCompleteTaskButtonClick={onCompleteTaskButtonClick}
          />
        </main>
        <TaskSideSheet
          task={featuredTask}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onCompleteTaskButtonClick={onCompleteTaskButtonClick}
        />
      </div>
    </>
  );
};

export default Someday;
