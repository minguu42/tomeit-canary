import { useState, VFC } from "react";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import TaskSideSheet from "@/components/models/task/TaskSideSheet";
import s from "./TasksPage.module.css";
import { useTasksActions } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { useRequiredLogin } from "@/lib/auth";

type Props = {
  title: string;
  filter: "today" | "tomorrow" | "someday";
};

const TasksPage: VFC<Props> = ({ title, filter }) => {
  useRequiredLogin();
  const { replaceTask, deleteTask } = useTasksActions();
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [featuredTask, setFeaturedTask] = useState<Task | null>(null);

  const onDeleteTaskButtonClick = (task: Task): void => {
    deleteTask(task);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
  };

  const onCompleteTaskButtonClick = (task: Task): void => {
    const newTask: Task = { ...task, isCompleted: true };
    replaceTask(task, newTask);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
  };

  const onPlayPomodoroButtonClick = (task: Task): void => {
    setPlayingTask(task);
  };

  const completePomodoro = (): void => {
    if (playingTask === null) return;
    const newTask = {
      ...playingTask,
      actualPomodoroNum: playingTask.actualPomodoroNum + 1,
    };
    replaceTask(playingTask, newTask);
    setPlayingTask(newTask);
  };

  const openTaskInSideSheet = (task: Task): void => {
    setFeaturedTask(task);
  };

  const closeTaskSideSheet = (): void => {
    setFeaturedTask(null);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={s.container}>
        <main className={s.main}>
          <PomodoroTimer
            playingTask={playingTask}
            completePomodoro={completePomodoro}
          />
          <div className={s.mt24} />
          <TaskAddForm />
          <TaskList
            filter={filter}
            featuredTask={featuredTask}
            onCompleteTaskButtonClick={onCompleteTaskButtonClick}
            onPlayPomodoroButtonClick={onPlayPomodoroButtonClick}
            openTaskInSideSheet={openTaskInSideSheet}
            closeTaskSideSheet={closeTaskSideSheet}
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

export default TasksPage;
