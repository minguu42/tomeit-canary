import { VFC } from "react";

// @ts-ignore
import styles from "styles/components/TaskList.module.scss";
import TaskCard, { Task } from "components/TaskCard";

type Props = {
  tasks: Task[];
};

const TaskList: VFC<Props> = ({ tasks }) => (
  <div className={styles.outer}>
    {tasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        name={task.name}
        priority={task.priority}
        deadline={task.deadline}
        pomodoroCount={task.pomodoroCount}
        isPlaying={false}
      />
    ))}
  </div>
);

export default TaskList;
