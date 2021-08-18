import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import HomeHeading from "components/home/HomeHeading";
import AddTaskForm from "components/home/AddTaskForm";
import TaskList from "components/home/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";
import styles from "pages/home/Home.module.scss";
import { Task } from "types/task";
import { useState } from "react";

type Props = {
  tasks: Task[];
  playingTask: Task | null;
  nextRestCount: number;
  addTask: (task: Task) => void;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
  completePomodoro: (task: Task) => void;
};

const Home = ({
  tasks,
  playingTask,
  nextRestCount,
  addTask,
  completeTask,
  setTask,
  completePomodoro,
}: Props): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading headingText="いつか" tasks={tasks} />
      <div className={styles.taskListLayout}>
        <AddTaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          playingTask={playingTask}
          completeTask={completeTask}
          setTask={setTask}
        />
      </div>
      <div className={styles.playerLayout}>
        <PomodoroPlayer
          playingTask={playingTask}
          nextRestCount={nextRestCount}
          completePomodoro={completePomodoro}
        />
      </div>
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [playingTask, setPlayingTask] = useState<Task | null>(null);
  const [nextRestCount, setNextRestCount] = useState(4);

  const addTask = (task: Task): void => {
    // const reqBody = {
    //   title: task.title,
    //   expectedPomodoroNum: task.expectedPomodoroNum ?? 0,
    //   dueOn: task.dueOn ?? "0001-01-01T00:00:00Z",
    // }
    const tmp = tasks.slice();
    tmp.push(task);
    setTasks(tmp);
  };

  const completeTask = (task: Task): void => {
    const tmp = tasks.filter((t) => t.id !== task.id);
    setTasks(tmp);
  };

  const setTask = (task: Task): void => {
    setPlayingTask(task);
  };

  const completePomodoro = (task: Task): void => {
    task.actualPomodoroNum += 1;
    const tmp = tasks.slice();
    const index = tasks.findIndex((t) => t.id === task.id);
    tmp[index] = task;
    setTasks(tmp);
    setNextRestCount((c) => (c === 1 ? 4 : c - 1));
  };

  return (
    <Home
      tasks={tasks}
      playingTask={playingTask}
      nextRestCount={nextRestCount}
      addTask={addTask}
      completeTask={completeTask}
      setTask={setTask}
      completePomodoro={completePomodoro}
    />
  );
};

export default HomeContainer;
