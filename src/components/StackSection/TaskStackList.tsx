import TaskStackListItem from "components/StackSection/TaskStackListItem";
import styles from "components/StackSection/TaskStackList.module.scss";
import type { Task } from "lib/task";

type Props = {
  doneTasks: Task[];
};

const TaskStackList = ({ doneTasks }: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>完了したタスク</p>
    </div>
    <ul className={styles.list}>
      {doneTasks.map((task) => (
        <TaskStackListItem
          key={task.id}
          name={task.name}
          pomodoroCount={task.pomodoroCount}
          updatedAt={task.updatedAt}
        />
      ))}
    </ul>
  </div>
);

export default TaskStackList;
