import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import {
  usePomodoroTimerMutators,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import { Task } from "@/types/task";

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
  const featuredTask = useFeaturedTaskAtom();
  const { unsetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { unsetPlayingTask } = usePomodoroTimerMutators();

  const handleDeleteTaskButtonClick = (task: Task): void => {
    // TODO: Tomeit API を叩いて、タスクを削除する

    if (task.id === featuredTask?.id) {
      unsetFeaturedTask();
    }
    if (task.id === playingTask?.id) {
      unsetPlayingTask();
    }
  };

  const handleCompleteTaskButtonClick = (task: Task): void => {
    // TODO: Tomeit API を叩いて、タスクを更新する

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
