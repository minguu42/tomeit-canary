import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import AddTaskForm from "components/home/AddTaskForm";
import TaskList from "components/home/TaskList";
import styles from "pages/home/Home.module.scss";
import { Task } from "types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1",
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
      <AddTaskForm />
      <TaskList tasks={tasks} />
    </main>
  </>
);

const HomeContainer = (): JSX.Element => {
  return <Home />;
};

export default HomeContainer;
