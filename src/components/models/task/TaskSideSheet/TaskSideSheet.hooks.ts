import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import { useUserAtom } from "@/globalStates/userAtom";
import {
  usePomodoroTimerActions,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import { newTask, Task } from "@/models/task/task";
import { patchTask } from "@/models/task/fetch";

type Values = {
  featuredTaskExists: boolean;
  featuredTask: Task;
  handleDeleteTaskButtonClick: (task: Task) => void;
  handleCompleteTaskButtonClick: (task: Task) => void;
};

export const useTaskSideSheet = (): Values => {
  const initTask = {
    id: 0,
    title: "",
    estimatedPomoNum: 0,
    completedPomoNum: 0,
    dueOn: null,
    completedOn: null,
  };
  const user = useUserAtom();
  const { replaceTask, deleteTask } = useTasksMutators();
  const featuredTask = useFeaturedTaskAtom();
  const { setFeaturedTask, unsetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { unsetPlayingTask } = usePomodoroTimerActions();

  const handleDeleteTaskButtonClick = (task: Task): void => {
    deleteTask(task);
    if (task.id === featuredTask?.id) {
      setFeaturedTask(task);
    }
  };

  const handleCompleteTaskButtonClick = (task: Task): void => {
    patchTask(user, task.id, JSON.stringify({ completedOn: new Date() }))
      .then((taskResponse) => {
        taskResponse && replaceTask(task, newTask(taskResponse));
      })
      .catch((error) => console.error(error));

    if (task.id === featuredTask?.id) {
      unsetFeaturedTask();
    }
    if (task.id === playingTask?.id) {
      unsetPlayingTask();
    }
  };

  return {
    featuredTaskExists: featuredTask != null,
    featuredTask: featuredTask != null ? featuredTask : initTask,
    handleDeleteTaskButtonClick,
    handleCompleteTaskButtonClick,
  };
};
