import { FC, useState } from "react";
import Head from "next/head";

import PomodoroTimer from "@/components/models/pomodoro/PomodoroTimer";
import TaskAddForm from "@/components/models/task/TaskAddForm";
import TaskList from "@/components/models/task/TaskList";
import TaskSideSheet from "@/components/models/task/TaskSideSheet";
import { useRequiredLogin } from "@/components/functional/Auth";
import s from "./TaskPage.module.css";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import {
  usePomodoroTimerActions,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import { Task } from "@/models/task";

type Props = {
  title: string;
  filter: "today" | "tomorrow" | "someday";
};

const TaskPage: FC<Props> = ({ title, filter }) => {
  useRequiredLogin();
  const { replaceTask, deleteTask } = useTasksMutators();
  const { playPomodoro, setPlayingTask } = usePomodoroTimerActions();
  const { playingTask } = usePomodoroTimerAtom();
  const [featuredTask, setFeaturedTask] = useState<Task | null>(null);

  const onDeleteTaskButtonClick = (task: Task): void => {
    deleteTask(task);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
  };

  const completeTask = (task: Task): void => {
    const newTask: Task = { ...task, isCompleted: true };
    replaceTask(task, newTask);
    if (featuredTask !== null && task.id === featuredTask.id) {
      setFeaturedTask(null);
    }
    if (playingTask !== null && task.id === playingTask.id) {
      setPlayingTask(null);
    }
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
          <PomodoroTimer />
          <div className={s.mt24} />
          <TaskAddForm />
          <TaskList
            filter={filter}
            featuredTask={featuredTask}
            completeTask={completeTask}
            playPomodoro={playPomodoro}
            openTaskInSideSheet={openTaskInSideSheet}
            closeTaskSideSheet={closeTaskSideSheet}
          />
        </main>
        <TaskSideSheet
          task={featuredTask}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onCompleteTaskButtonClick={completeTask}
        />
      </div>
    </>
  );
};

export default TaskPage;
