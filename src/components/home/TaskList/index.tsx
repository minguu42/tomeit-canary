import TaskListItem from "components/common/TaskListItem";
import styles from "components/home/TaskList/TaskList.module.scss";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props): JSX.Element => (
  <ul className={styles.list}>
    {tasks.map((task) => (
      <TaskListItem key={task.id} task={task} />
    ))}
  </ul>
);

export default TaskList;
