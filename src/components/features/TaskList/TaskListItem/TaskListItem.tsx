import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import {
  AlarmIcon,
  AlarmOnIcon,
  CalendarMonthIcon,
  CircleIcon,
  DescriptionIcon,
  PlayArrowIcon,
  TimerIcon,
} from "@/components/common/icons";
import * as s from "./TaskListItem.css";
import { usePlayingTask, usePlayingTaskMutators } from "@/globalStates/playingTask";
import { useRemarkedTask, useRemarkedTaskMutators } from "@/globalStates/remarkedTask";
import { useTasksMutators } from "@/globalStates/tasks";
import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";
import Flag from "@/components/features/TaskList/TaskListItem/Flag";

type Props = {
  task: Task;
};

const TaskListItem: FC<Props> = ({ task }) => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const playingTask = usePlayingTask();
  const { setPlayingTask, unsetPlayingTask } = usePlayingTaskMutators();
  const { doneTask } = useTasksMutators();

  const handleClick = () => {
    if (remarkedTask === null) {
      setRemarkedTask(task);
      return;
    }

    if (task.id === remarkedTask.id) {
      unsetRemarkedTask();
    } else {
      setRemarkedTask(task);
    }
  };

  const handleCircleButtonClick = () => {
    if (task.id === remarkedTask?.id) {
      unsetRemarkedTask();
    }

    if (task.id === playingTask?.id) {
      unsetPlayingTask();
    }

    doneTask(task.id);
  };

  const handlePlayButtonClick = () => {
    setPlayingTask(task);
  };

  const flagsExist =
    task.actualCount !== 0 || task.estimatedCount !== 0 || task.hasDoToday || task.dueOn !== null;

  return (
    <li className={s.container}>
      <IconButton icon={<CircleIcon />} label="タスクの完了" onClick={handleCircleButtonClick} />
      <button onClick={handleClick} className={s.mainContainer}>
        <h3 className={s.heading}>{task.title}</h3>
        {flagsExist && (
          <div className={s.flags}>
            {task.actualCount !== 0 && (
              <Flag icon={<AlarmOnIcon size={18} />} labelText={String(task.actualCount)} />
            )}
            {task.estimatedCount !== 0 && (
              <Flag icon={<AlarmIcon size={18} />} labelText={String(task.estimatedCount)} />
            )}
            {task.hasDoToday && (
              <Flag icon={<DescriptionIcon size={18} />} labelText="今日やること" />
            )}
            {task.dueOn !== null && (
              <Flag
                icon={<CalendarMonthIcon size={18} />}
                labelText={formatDate(task.dueOn, "locale")}
              />
            )}
          </div>
        )}
      </button>
      <IconButton
        icon={<PlayArrowIcon />}
        label="ポモドーロの実行"
        onClick={handlePlayButtonClick}
      />
      <div className={s.stateLayer} />
    </li>
  );
};

export default TaskListItem;
