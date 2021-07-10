import { VFC } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";
import TaskCard from "../../components/TaskCard";

const UserHome: VFC = () => (
  <main className={styles.main}>
    <StatusBar restCount={4} undoneTaskNumber={5} pomodoroNumber={2} />
    <AddTaskForm />
    <TaskCard
      id={1}
      name="タスク1"
      priority={0}
      deadline={"2021-01-01"}
      pomodoroCount={0}
      isPlaying={false}
    />
    <TaskCard
      id={2}
      name="タスク2"
      priority={0}
      deadline={"0001-01-01"}
      pomodoroCount={2}
      isPlaying={true}
    />
    <TaskCard
      id={3}
      name="タスク3"
      priority={1}
      deadline={"0001-01-01"}
      pomodoroCount={0}
      isPlaying={false}
    />
    <TaskCard
      id={4}
      name="タスク4"
      priority={2}
      deadline={"0001-01-01"}
      pomodoroCount={7}
      isPlaying={false}
    />
    <TaskCard
      id={5}
      name="タスク5"
      priority={3}
      deadline={"0001-01-01"}
      pomodoroCount={2}
      isPlaying={false}
    />
  </main>
);

export default UserHome;
