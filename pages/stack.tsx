import styles from "styles/pages/Stack.module.scss";
import LogSection from "components/modules/LogSection";
import type { Task } from "lib/task";
import type { PomodoroRecord } from "lib/pomodoro";

const doneTasks: Task[] = [
  {
    id: 1,
    name: "タスク1",
    priority: 2,
    deadline: "",
    isDone: true,
    pomodoroCount: 0,
    createdAt: "2021-01-01T12:00:00Z",
    updatedAt: "2021-01-01T12:00:00Z",
  },
  {
    id: 2,
    name: "タスク2",
    priority: 1,
    deadline: "",
    isDone: true,
    pomodoroCount: 4,
    createdAt: "2021-01-01T12:00:00Z",
    updatedAt: "2021-01-01T12:25:00Z",
  },
  {
    id: 3,
    name: "タスク3",
    priority: 0,
    deadline: "",
    isDone: true,
    pomodoroCount: 10,
    createdAt: "2021-01-01T12:00:00Z",
    updatedAt: "2021-01-01T13:00:00Z",
  },
];

const pomodoroRecords: PomodoroRecord[] = [
  {
    id: 1,
    taskName: "タスク1",
    createdAt: "2021-01-01T12:25:00Z",
  },
  {
    id: 2,
    taskName: "タスク2",
    createdAt: "2021-01-01T12:55:00Z",
  },
  {
    id: 3,
    taskName: "タスク1",
    createdAt: "2021-01-01T13:20:00Z",
  },
  {
    id: 4,
    taskName: "タスク1",
    createdAt: "2021-01-01T14:30:00Z",
  },
];

const Stack = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <LogSection doneTasks={doneTasks} pomodoroRecords={pomodoroRecords} />
    </main>
  );
};

export default Stack;
