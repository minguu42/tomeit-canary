import { newTask, Task } from "@/types/task";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import {
  usePomodoroTimerMutators,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import { patchTask } from "@/models/task/fetch";
import { useUserAtom } from "@/globalStates/userAtom";

type Values = {
  handlePlayButtonClick: (task: Task) => void;
  handleCompleteButtonClick: (task: Task) => void;
  handleSideSheetButtonClick: (task: Task) => void;
};

export const useTaskListItem = (): Values => {
  const user = useUserAtom();
  const { replaceTask } = useTasksMutators();
  const featuredTask = useFeaturedTaskAtom();
  const { setFeaturedTask, unsetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { playPomodoro, unsetPlayingTask } = usePomodoroTimerMutators();

  const handlePlayButtonClick = (task: Task): void => {
    playPomodoro(task);
  };

  const handleCompleteButtonClick = (task: Task): void => {
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

  const handleSideSheetButtonClick = (task: Task): void => {
    if (task.id === featuredTask?.id) {
      unsetFeaturedTask();
    } else {
      setFeaturedTask(task);
    }
  };

  return {
    handlePlayButtonClick,
    handleCompleteButtonClick,
    handleSideSheetButtonClick,
  };
};
