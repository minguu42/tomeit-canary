import { VFC } from "react";

import styles from "styles/pages/UserHome.module.scss";
import StatusBar from "components/StatusBar";
import AddTaskForm from "components/AddTaskForm";

const UserHome: VFC = () => (
  <main className={styles.main}>
    <StatusBar restCount={4} undoneTaskNumber={5} pomodoroNumber={2} />
    <AddTaskForm />
  </main>
);

export default UserHome;
