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
  addTask: (task: Task) => void;
  completeTask: (task: Task) => void;
};

const Home = ({ tasks, addTask, completeTask }: Props): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading headingText="いつか" tasks={tasks} />
      <div className={styles.taskListLayout}>
        <AddTaskForm addTask={addTask} />
        <TaskList tasks={tasks} completeTask={completeTask} />
      </div>
      <div className={styles.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return <Home tasks={tasks} addTask={addTask} completeTask={completeTask} />;
};

export default HomeContainer;
