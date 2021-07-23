import styles from "styles/components/parts/TaskLogList.module.scss";
import TaskStackListItem from "components/parts/TaskStackListItem";
import type { Task } from "lib/task";

type Props = {
  doneTasks: Task[];
};

const TaskStackList = ({ doneTasks }: Props) => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>完了したタスク</p>
    </div>
    <ul className={styles.list}>
      {doneTasks.map((log) => (
        <TaskStackListItem
          key={log.id}
          id={log.id}
          name={log.name}
          pomodoroCount={log.pomodoroCount}
          completeAt={log.updatedAt}
        />
      ))}
    </ul>
  </div>
);

export default TaskStackList;
