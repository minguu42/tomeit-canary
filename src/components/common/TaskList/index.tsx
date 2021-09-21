import TaskListItem from "./TaskListItem";
import s from "./styles.module.scss";
import { playingTaskState, Task, tasksState } from "models/task";
import { useRecoilState } from "recoil";

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

const TaskListContainer = (): JSX.Element => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [playingTask, setPlayingTask] = useRecoilState(playingTaskState);

  const completeTask = (task: Task): void => {
    // TODO: タスク完了 API を叩く
    const index = tasks.findIndex((t) => t.id === task.id);
    setTasks((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const setTask = (task: Task): void => {
    setPlayingTask(task);
  };

  return (
    <TaskList
      tasks={tasks}
      playingTask={playingTask}
      completeTask={completeTask}
      setTask={setTask}
    />
  );
};

export default TaskListContainer;