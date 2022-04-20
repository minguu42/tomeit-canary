import { newTask, Task } from "@/models/task/task";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import {
  usePomodoroTimerActions,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import {
  useFeaturedTaskAtom,
  useFeaturedTaskMutators,
} from "@/globalStates/featuredTaskAtom";
import { patchTask } from "@/models/task/fetch";
import { useUserAtom } from "@/globalStates/userAtom";

type Values = {
  handleCompleteButtonClick: () => void;
};

export const useTaskListItem = (task: Task): Values => {
  const user = useUserAtom();
  const { replaceTask } = useTasksMutators();
  const featuredTask = useFeaturedTaskAtom();
  const { resetFeaturedTask } = useFeaturedTaskMutators();
  const { playingTask } = usePomodoroTimerAtom();
  const { setPlayingTask } = usePomodoroTimerActions();

  const handleCompleteButtonClick = () => {
    patchTask(user, task.id, JSON.stringify({ completedOn: new Date() }))
      .then((taskResponse) => {
        taskResponse && replaceTask(task, newTask(taskResponse));
      })
      .catch((error) => console.error(error));

    if (featuredTask !== null && task.id === featuredTask.id) {
      resetFeaturedTask();
    }
    if (playingTask !== null && task.id === playingTask.id) {
      setPlayingTask(null);
    }
  };

  return { handleCompleteButtonClick };
};
