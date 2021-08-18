import TaskListItem from "components/home/TaskList/TaskListItem";
import styles from "components/home/TaskList/TaskList.module.scss";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
  completeTask: (task: Task) => void;
};

export const TaskList = ({ tasks, completeTask }: Props): JSX.Element => (
  <ul className={styles.list}>
    {tasks.map((task) => (
      <TaskListItem key={task.id} task={task} completeTask={completeTask} />
    ))}
  </ul>
);

export default TaskList;
