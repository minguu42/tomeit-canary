import { useRecoilState } from "recoil";

import TaskListItem from "./TaskListItem";
import s from "./styles.module.scss";
import {
  playingTaskState,
  Task,
  useFilteredTasks,
  useTasksActions,
} from "models/task";
import { patchData } from "lib/fetch";
import { useUser } from "lib/auth";
import { useIsPomodoroPlaying } from "lib/states";

type Props = {
  tasks: Task[];
  playingTask: Task | null;
  isPomodoroPlaying: boolean;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
};

export const TaskList = ({
  tasks,
  playingTask,
  isPomodoroPlaying,
  completeTask,
  setTask,
}: Props): JSX.Element => (
  <ul className={s.list}>
    {tasks.map((task) => (
      <TaskListItem
        key={task.id}
        task={task}
        isTaskSet={task.id === playingTask?.id}
        isPomodoroPlaying={isPomodoroPlaying}
        completeTask={completeTask}
        setTask={setTask}
      />
    ))}
  </ul>
);

const TaskListContainer = (): JSX.Element => {
  const { deleteTask } = useTasksActions();
  const filteredTasks = useFilteredTasks();
  const [playingTask, setPlayingTask] = useRecoilState(playingTaskState);
  const isPomodoroPlaying = useIsPomodoroPlaying();
  const user = useUser();

  const completeTask = (task: Task): void => {
    const reqBody = {
      isCompleted: "true",
    };
    patchData(`/tasks/${task.id}`, reqBody, user)
      .then(() => {
        const index = filteredTasks.findIndex((t) => t.id === task.id);
        deleteTask(index);
      })
      .catch((error) => console.error(error));
  };

  const setTask = (task: Task): void => {
    setPlayingTask(task);
  };

  return (
    <TaskList
      tasks={filteredTasks}
      playingTask={playingTask}
      isPomodoroPlaying={isPomodoroPlaying}
      completeTask={completeTask}
      setTask={setTask}
    />
  );
};

export default TaskListContainer;
