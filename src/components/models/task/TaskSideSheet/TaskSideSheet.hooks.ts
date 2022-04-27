import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import { useUserAtom } from "@/globalStates/userAtom";
import {
  usePomodoroTimerMutators,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import { newTask, Task } from "@/types/task";
import { patchTask, deleteTask } from "@/models/task/fetch";

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
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const user = useUserAtom();
  const { replaceTask, destroyTask } = useTasksMutators();
  const featuredTask = useFeaturedTaskAtom();
  const { unsetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { unsetPlayingTask } = usePomodoroTimerMutators();

  const handleDeleteTaskButtonClick = (task: Task): void => {
    deleteTask(user, task.id)
      .then((ok) => {
        if (ok) {
          destroyTask(task);
          if (task.id === featuredTask?.id) {
            unsetFeaturedTask();
          }
          if (task.id === playingTask?.id) {
            unsetPlayingTask();
          }
        }
      })
      .catch((error) => console.error(error));
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
