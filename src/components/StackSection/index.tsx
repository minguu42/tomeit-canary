import TaskStackList from "components/StackSection/TaskStackList";
import PomodoroStackList from "components/StackSection/PomodoroStackList";
import styles from "components/StackSection/StackSection.module.scss";
import type { Task } from "lib/task";
import type { PomodoroRecord } from "lib/pomodoro";

type Props = {
  doneTasks: Task[];
  pomodoroRecords: PomodoroRecord[];
};

const StackSection = ({ doneTasks, pomodoroRecords }: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <h6>今日</h6>
      <p>タスク数：{doneTasks.length}</p>
      <p>ポモドーロ数：{pomodoroRecords.length}</p>
    </div>
    <TaskStackList doneTasks={doneTasks} />
    <PomodoroStackList pomodoroRecords={pomodoroRecords} />
  </div>
);

export default StackSection;
