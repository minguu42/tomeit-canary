import TaskRecordListItem from "./ListItem";
import styles from "./styles.module.scss";
import { Task } from "types/task";

type Props = {
  tasks: Task[];
};

export const TaskRecordList = ({ tasks }: Props): JSX.Element => (
  <div>
    <div className={styles.label}>
      <h3>タスク</h3>
      <p>タスク数：{tasks.length}</p>
    </div>
    <ul>
      {tasks.map((task) => (
        <TaskRecordListItem key={task.id} task={task} />
      ))}
    </ul>
  </div>
);

export default TaskRecordList;
