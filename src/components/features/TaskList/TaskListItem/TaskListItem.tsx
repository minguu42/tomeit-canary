import { FC } from "react";

import { IconButton } from "@/components/common/IconButton";
import {
  AlarmIcon,
  AlarmOnIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  DescriptionIcon,
  PlayIcon,
} from "@/components/common/icons";
import { Flag } from "@/components/features/TaskList/TaskListItem/Flag";
import * as s from "./TaskListItem.css";
import { formatDate } from "@/lib/formatDate";
import { usePlayingTask, usePlayingTaskMutators } from "@/stores/playingTask";
import { useRemarkedTask, useRemarkedTaskMutators } from "@/stores/remarkedTask";
import { useTasksMutators } from "@/stores/tasks";
import { Task } from "@/types/task";

type Props = {
  task: Task;
};

export const TaskListItem: FC<Props> = ({ task }) => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const playingTask = usePlayingTask();
  const { setPlayingTask, unsetPlayingTask } = usePlayingTaskMutators();
  const { doneTask, undoneTask } = useTasksMutators();

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
    if (task.id === playingTask?.id) {
      unsetPlayingTask();
    }

    doneTask(task.id);
  };

  const handleCheckCircleButtonClick = () => {
    undoneTask(task.id);
  };

  const handlePlayButtonClick = () => {
    setPlayingTask(task);
  };

  const flagsExist =
    task.actualCount !== 0 || task.estimatedCount !== 0 || task.hasDoToday || task.dueOn !== null;

  if (task.completedOn !== null) {
    return (
      <li className={s.container}>
        <button onClick={handleClick} className={s.mainCompleted}>
          <div className={s.stateLayer} />
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
                  icon={<CalendarIcon size={18} />}
                  labelText={formatDate(task.dueOn, "locale")}
                />
              )}
            </div>
          )}
        </button>
        <div className={s.leftIconLayout}>
          <IconButton
            icon={<CheckCircleIcon />}
            label="タスクの完了を取り消し"
            onClick={handleCheckCircleButtonClick}
          />
        </div>
      </li>
    );
  }

  return (
    <li className={s.container}>
      <button onClick={handleClick} className={s.main}>
        <div className={s.stateLayer} />
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
                icon={<CalendarIcon size={18} />}
                labelText={formatDate(task.dueOn, "locale")}
              />
            )}
          </div>
        )}
      </button>
      <div className={s.leftIconLayout}>
        <IconButton icon={<CircleIcon />} label="タスクの完了" onClick={handleCircleButtonClick} />
      </div>
      <div className={s.rightIconLayout}>
        <IconButton icon={<PlayIcon />} label="ポモドーロの実行" onClick={handlePlayButtonClick} />
      </div>
    </li>
  );
};
