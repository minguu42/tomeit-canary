import TaskListItem from "./TaskListItem";
import s from "./styles.module.scss";
import { Task } from "models/task";

type Props = {
  tasks: Task[];
  playingTask: Task | null;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
};

export const TaskList = ({
  tasks,
  playingTask,
  completeTask,
  setTask,
}: Props): JSX.Element => (
  <ul className={s.list}>
    {tasks.map((task) => (
      <TaskListItem
        key={task.id}
        task={task}
        isPlaying={task.id === playingTask?.id}
        completeTask={completeTask}
        setTask={setTask}
      />
    ))}
  </ul>
);

export default TaskList;
