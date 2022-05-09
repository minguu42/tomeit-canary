import {
  usePomodoroTimerMutators,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import { useTaskActions } from "@/hooks/fetch";
import { Task } from "@/types/task";

type Values = {
  handlePlayButtonClick: (task: Task) => void;
  handleCompleteButtonClick: (task: Task) => void;
  handleSideSheetButtonClick: (task: Task) => void;
};

export const useTaskListItem = (): Values => {
  const { putCompleteTask } = useTaskActions();
  const featuredTask = useFeaturedTaskAtom();
  const { setFeaturedTask, unsetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { playPomodoro, unsetPlayingTask } = usePomodoroTimerMutators();

  const handlePlayButtonClick = (task: Task): void => {
    playPomodoro(task);
  };

  const handleCompleteButtonClick = (task: Task): void => {
    putCompleteTask(task.id).catch((error) => {
      console.error(error);
    });

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
