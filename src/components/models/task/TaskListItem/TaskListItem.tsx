import { VFC } from "react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import PomodoroCaption from "@/components/models/pomodoro/PomodoroCaption";
import IconButton from "@/components/common/IconButton";
import s from "./TaskListItem.module.css";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  task: Task;
  featuredTask: Task | null;
  onCompleteTaskButtonClick: () => void;
  onPlayPomodoroButtonClick: () => void;
  openInTaskSideSheet: () => void;
  closeTaskSideSheet: () => void;
};

const TaskListItem: VFC<Props> = ({
  task,
  featuredTask,
  onCompleteTaskButtonClick,
  onPlayPomodoroButtonClick,
  openInTaskSideSheet,
  closeTaskSideSheet,
}) => {
  return (
    <li className={s.container}>
      <IconButton
        icon={<CircleIcon />}
        onClick={onCompleteTaskButtonClick}
        label="タスクを完了する"
      />
      <button
        onClick={
          task === featuredTask ? closeTaskSideSheet : openInTaskSideSheet
        }
        className={s.main}
      >
        <p className={s.title}>{task.title}</p>
        <PomodoroCaption
          expectedPomodoroNum={task.expectedPomodoroNum}
          actualPomodoroNum={task.actualPomodoroNum}
        />
      </button>
      {task.dueOn && <p className={s.dueOnCaption}>{formatDate(task.dueOn)}</p>}
      <IconButton
        icon={<PlayCircleIcon />}
        onClick={onPlayPomodoroButtonClick}
        label="ポモドーロを開始する"
      />
    </li>
  );
};

export default TaskListItem;
