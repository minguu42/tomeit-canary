import { FC } from "react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import PomodoroCaption from "@/components/models/pomodoro/PomodoroCaption";
import IconButton from "@/components/common/IconButton";
import s from "./TaskListItem.module.css";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/format";
import { useTaskListItem } from "@/components/models/task/TaskListItem/TaskListItem.hooks";

type Props = {
  task: Task;
};

const TaskListItem: FC<Props> = ({ task }) => {
  const {
    handlePlayButtonClick,
    handleCompleteButtonClick,
    handleSideSheetButtonClick,
  } = useTaskListItem();

  return (
    <li className={s.container}>
      <IconButton
        icon={<CircleIcon />}
        onClick={() => handleCompleteButtonClick(task)}
        label="タスクを完了する"
      />
      <button
        onClick={() => handleSideSheetButtonClick(task)}
        className={s.main}
      >
        <p className={s.title}>{task.title}</p>
        <PomodoroCaption
          expectedPomodoroNum={task.estimatedPomoNum}
          actualPomodoroNum={task.completedPomoNum}
        />
      </button>
      {task.dueOn && <p className={s.dueOnCaption}>{formatDate(task.dueOn)}</p>}
      <IconButton
        icon={<PlayCircleIcon />}
        onClick={() => handlePlayButtonClick(task)}
        label="ポモドーロを開始する"
      />
    </li>
  );
};

export default TaskListItem;
