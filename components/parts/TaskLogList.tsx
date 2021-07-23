import styles from "styles/components/parts/TaskLogList.module.scss";
import TaskStack, { TaskLog } from "components/parts/TaskStack";

type Props = {
  taskLogs: TaskLog[];
};

const TaskLogList = ({ taskLogs }: Props) => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>完了したタスク</p>
    </div>
    <ul className={styles.list}>
      {taskLogs.map((log) => (
        <TaskStack
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
