import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import TaskListItem from "./TaskListItem";
import s from "./styles.module.scss";
import {
  filteredTasksState,
  playingTaskState,
  Task,
  tasksState,
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
  const setTasks = useSetRecoilState(tasksState);
  const filteredTasks = useRecoilValue(filteredTasksState);
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
        setTasks((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
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
