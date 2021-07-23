import styles from "styles/pages/Stack.module.scss";
import { TaskLog } from "components/parts/TaskStack";
import { PomodoroLog } from "components/parts/PomodoroLogItem";
import LogSection from "components/modules/LogSection";

const taskLogs: TaskLog[] = [
  {
    id: 1,
    name: "タスク1",
    pomodoroCount: 0,
    completeAt: "2021-01-01T12:00:00Z",
  },
  {
    id: 2,
    name: "タスク2",
    pomodoroCount: 4,
    completeAt: "2021-01-01T12:25:00Z",
  },
  {
    id: 3,
    name: "タスク3",
    pomodoroCount: 10,
    completeAt: "2021-01-01T13:00:00Z",
  },
];

const pomodoroLogs: PomodoroLog[] = [
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

const LogsPage = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <LogSection taskLogs={taskLogs} pomodoroLogs={pomodoroLogs} />
    </main>
  );
};

export default LogsPage;
