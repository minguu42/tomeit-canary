import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import {
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

type Props = {
  task: Task;
  isFocusPage?: boolean;
};

const TaskListItem: FC<Props> = ({ task, isFocusPage }) => {
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

  const actualCountFlag = (
    <div>
      <TimerIcon size={18} />
      {task.actualCount}
    </div>
  );
  const hasDoTodayFlag = (
    <div className={s.flags}>
      <DescriptionIcon size={18} />
      今日やること
    </div>
  );
  const dueOnFlag = (
    <div>
      <CalendarMonthIcon size={18} />
      {task.dueOn !== null && formatDate(task.dueOn, "locale")}
    </div>
  );

  return (
    <li className={s.container}>
      <div className={s.zIndex1}>
        <IconButton icon={<CircleIcon />} label="タスクの完了" onClick={handleCircleButtonClick} />
      </div>
      <button onClick={handleClick} className={s.mainContainer}>
        <h3 className={s.heading}>{task.title}</h3>
        {flagsExist && (
          <div className={s.flags}>
            {task.actualCount !== 0 && actualCountFlag}
            {task.hasDoToday && hasDoTodayFlag}
            {task.dueOn !== null && dueOnFlag}
          </div>
        )}
      </button>
      {isFocusPage && (
        <div className={s.zIndex1}>
          <IconButton
            icon={<PlayArrowIcon />}
            label="ポモドーロの実行"
            onClick={handlePlayButtonClick}
          />
        </div>
      )}
      <div className={s.stateLayer} />
    </li>
  );
};

export default TaskListItem;
