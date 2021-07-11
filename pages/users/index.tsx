import { VFC } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";
import TaskList from "components/TaskList";
import PomodoroPlayer from "components/PomodoroPlayer";

import type { Task } from "components/TaskCard";

const tasks: Task[] = [
  {
    id: 1,
    name: "国境の長いトンネルを抜けると雪国であった。夜の底は白かった。色々とわからないこともあった。松の木を見た",
    priority: 0,
    deadline: "2021-01-01",
    pomodoroCount: 0,
  },
  {
    id: 2,
    name: "タスク2",
    priority: 0,
    deadline: "2021-12-31",
    pomodoroCount: 1,
  },
  {
    id: 3,
    name: "タスク3",
    priority: 1,
    deadline: "0001-01-01",
    pomodoroCount: 2,
  },
  {
    id: 4,
    name: "タスク4",
    priority: 2,
    deadline: "0001-01-01",
    pomodoroCount: 4,
  },
  {
    id: 5,
    name: "タスク5",
    priority: 3,
    deadline: "0001-01-01",
    pomodoroCount: 7,
  },
  {
    id: 5,
    name: "タスク5",
    priority: 3,
    deadline: "0001-01-01",
    pomodoroCount: 7,
  },
  {
    id: 6,
    name: "タスク5",
    priority: 3,
    deadline: "0001-01-01",
    pomodoroCount: 7,
  },
  {
    id: 7,
    name: "タスク5",
    priority: 3,
    deadline: "0001-01-01",
    pomodoroCount: 7,
  },
  {
    id: 8,
    name: "タスク5",
    priority: 3,
    deadline: "0001-01-01",
    pomodoroCount: 7,
  },
];

const UserHome: VFC = () => (
  <main className={styles.main}>
    <StatusBar restCount={4} undoneTaskNumber={5} pomodoroNumber={2} />
    <AddTaskForm />
    <TaskList tasks={tasks} />
    <div className={styles.playerLayout}>
      <PomodoroPlayer
        leftTime={1500}
        task={tasks[0]}
        isPomodoro={true}
        isPlayingPomodoro={false}
        isTimerActive={false}
      />
    </div>
  </main>
);

export default UserHome;
