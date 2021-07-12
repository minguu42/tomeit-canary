import { VFC } from "react";

import styles from "styles/components/TaskLogList.module.scss";
import TaskLogItem, { TaskLog } from "components/TaskLogItem";

type Props = {
  taskLogs: TaskLog[];
};

const TaskLogList: VFC<Props> = ({ taskLogs }) => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>完了したタスク</p>
    </div>
    <ul className={styles.list}>
      {taskLogs.map((log) => (
        <TaskLogItem
          key={log.id}
          id={log.id}
          name={log.name}
          pomodoroCount={log.pomodoroCount}
          completeAt={log.completeAt}
        />
      ))}
    </ul>
  </div>
);

export default TaskLogList;
