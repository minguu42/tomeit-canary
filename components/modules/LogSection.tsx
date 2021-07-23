import styles from "styles/components/modules/LogSection.module.scss";
import TaskStackList from "components/parts/TaskStackList";
import PomodoroStackList from "components/parts/PomodoroStackList";
import type { Task } from "lib/task";
import type { PomodoroRecord } from "lib/pomodoro";

type Props = {
  doneTasks: Task[];
  pomodoroRecords: PomodoroRecord[];
};

const LogSection = ({ doneTasks, pomodoroRecords }: Props): JSX.Element => (
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

export default LogSection;
