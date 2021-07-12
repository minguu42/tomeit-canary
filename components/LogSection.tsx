import { VFC } from "react";

import styles from "styles/components/LogSection.module.scss";
import TaskLogList from "components/TaskLogList";
import { TaskLog } from "components/TaskLogItem";
import PomodoroLogList from "components/PomodoroLogList";
import { PomodoroLog } from "components/PomodoroLogItem";

type Props = {
  taskLogs: TaskLog[];
  pomodoroLogs: PomodoroLog[];
};

const LogSection: VFC<Props> = ({ taskLogs, pomodoroLogs }) => (
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
