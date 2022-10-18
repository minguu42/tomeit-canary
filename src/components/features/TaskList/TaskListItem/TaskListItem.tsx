import { FC } from "react";

import StandardIconButton from "@/components/common/StandardIconButton";
import {
  CalendarMonthIcon,
  CircleIcon,
  DescriptionIcon,
  PlayCircleIcon,
  TimerIcon,
} from "@/components/icons";
import * as s from "./TaskListItem.css";
import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";
import {
  useRemarkedTask,
  useRemarkedTaskMutators,
} from "@/globalStates/remarkedTask";
import { usePlayingTaskMutators } from "@/globalStates/playingTask";

type Props = {
  task: Task;
  isFocusPage?: boolean;
};

const TaskListItem: FC<Props> = ({ task, isFocusPage }) => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const { setPlayingTask } = usePlayingTaskMutators();
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
  const handlePlayButtonClick = () => {
    setPlayingTask(task);
  };

  const flagsExist =
    task.actualCount !== 0 ||
    task.estimatedCount !== 0 ||
    task.hasDoToday ||
    task.dueOn !== null;
  const actualCountFlag = (
    <div className={s.actualCountFlag}>
      <TimerIcon size={18} />
      <p>{task.actualCount}</p>
    </div>
  );
  const estimatedCountFlag = (
    <div className={s.estimatedCountFlag}>
      {task.actualCount !== 0 && <p>/</p>}
      <TimerIcon size={18} />
      <p>{task.estimatedCount}</p>
    </div>
  );
  const hasDoTodayFlag = (
    <div className={s.flag}>
      <DescriptionIcon size={18} />
      <p>今日やること</p>
    </div>
  );
  const dueOnFlag = (
    <div className={s.flag}>
      <CalendarMonthIcon size={18} />
      <p>{task.dueOn !== null && formatDate(task.dueOn, "locale")}</p>
    </div>
  );

  return (
    <li className={s.container}>
      <StandardIconButton
        icon={<CircleIcon />}
        label="タスクの完了"
        onClick={() => window.alert("タスクの完了")}
      />
      <button className={s.main} onClick={handleClick}>
        <p className={s.title}>{task.title}</p>
        {flagsExist && (
          <div className={s.flags}>
            {task.actualCount !== 0 && actualCountFlag}
            {task.estimatedCount !== 0 && estimatedCountFlag}
            {task.hasDoToday && hasDoTodayFlag}
            {task.dueOn !== null && dueOnFlag}
          </div>
        )}
      </button>
      {isFocusPage && (
        <StandardIconButton
          icon={<PlayCircleIcon />}
          label="ポモドーロの実行"
          onClick={handlePlayButtonClick}
        />
      )}
    </li>
  );
};

export default TaskListItem;
