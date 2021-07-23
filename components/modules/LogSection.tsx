import styles from "styles/components/modules/LogSection.module.scss";
import TaskLogList from "components/parts/TaskLogList";
import { TaskLog } from "components/parts/TaskStack";
import PomodoroLogList from "components/parts/PomodoroLogList";
import { PomodoroLog } from "components/parts/PomodoroLogItem";

type Props = {
  taskLogs: TaskLog[];
  pomodoroLogs: PomodoroLog[];
};

const LogSection = ({ taskLogs, pomodoroLogs }: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <h6>今日</h6>
      <p>タスク数：{taskLogs.length}</p>
      <p>ポモドーロ数：{pomodoroLogs.length}</p>
    </div>
    <TaskLogList taskLogs={taskLogs} />
    <PomodoroLogList pomodoroLogs={pomodoroLogs} />
  </div>
);

export default LogSection;
