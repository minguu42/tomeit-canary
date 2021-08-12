import styles from "components/home/TaskList/TaskList.module.scss";
import TaskListItem from "components/home/TaskList/TaskListItem";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
};

const TaskList = ({ tasks }: Props): JSX.Element => (
  <div className={styles.list}>
    {tasks.map((task) => (
      <TaskListItem key={task.id} task={task} />
    ))}
  </div>
);

export default TaskList;
