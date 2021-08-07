import styles from "styles/components/modules/TaskList.module.scss";
import TaskCard from "components/parts/TaskCard";
import { Task } from "lib/task";

type Props = {
  tasks: Task[];
  playingTask: Task | null;
  playTask: (task: Task) => void;
  completeTask: (task: Task) => void;
};

const TaskList = ({
  tasks,
  playingTask,
  playTask,
  completeTask,
}: Props): JSX.Element => (
  <div className={styles.outer}>
    {tasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        name={task.name}
        priority={task.priority}
        deadline={task.deadline}
        pomodoroCount={task.pomodoroCount}
        isPlaying={playingTask?.id === task.id}
        handlePlayClick={() => playTask(task)}
        handleCircleClick={() => completeTask(task)}
      />
    ))}
  </div>
);

export default TaskList;
