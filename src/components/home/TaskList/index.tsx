import TaskListItem from "components/common/TaskListItem";
import styles from "components/home/TaskList/TaskList.module.scss";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props): JSX.Element => (
  <div className={styles.list}>
    {tasks.map((task) => (
      <TaskListItem key={task.id} task={task} />
    ))}
  </div>
);

export default TaskList;
