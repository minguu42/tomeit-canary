import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import HomeHeading from "components/home/HomeHeading";
import AddTaskForm from "components/home/AddTaskForm";
import TaskList from "components/home/TaskList";
import PomodoroPlayer from "components/home/PomodoroPlayer";
import styles from "pages/home/Home.module.scss";
import { Task } from "types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1の名前を長くしてみた。もっともっと長く、長く",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 0,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: false,
    completedAt: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 2,
    title: "タスク2",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 0,
    dueOn: new Date("2021-01-01T00:00:00Z"),
    isCompleted: false,
    completedAt: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 3,
    title: "タスク3",
    expectedPomodoroNum: 6,
    actualPomodoroNum: 4,
    dueOn: new Date("2021-12-30T09:00:00Z"),
    isCompleted: false,
    completedAt: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 4,
    title: "タスク4",
    expectedPomodoroNum: 6,
    actualPomodoroNum: 0,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: false,
    completedAt: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 5,
    title: "タスク5",
    expectedPomodoroNum: 0,
    actualPomodoroNum: 4,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: false,
    completedAt: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
];

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>ホーム - tomeit</title>
    </Head>

    <TopAppBar />
    <main className={styles.main}>
      <HomeHeading headingText="いつか" tasks={tasks} />
      <div className={styles.taskListLayout}>
        <AddTaskForm />
        <TaskList tasks={tasks} />
      </div>
      <div className={styles.playerLayout}>
        <PomodoroPlayer />
      </div>
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  return <Home />;
};

export default HomeContainer;
