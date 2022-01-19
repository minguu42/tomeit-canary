import { VFC } from "react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import PomodoroCaption from "@/components/models/pomodoro/PomodoroCaption";
import s from "./TaskListItem.module.css";
import type { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  task: Task;
  featuredTask: Task | null;
  completeTask: () => void;
  playPomodoro: () => void;
  openInTaskSideSheet: () => void;
  closeTaskSideSheet: () => void;
};

const TaskListItem: VFC<Props> = ({
  task,
  featuredTask,
  completeTask,
  playPomodoro,
  openInTaskSideSheet,
  closeTaskSideSheet,
}) => {
  return (
    <li className={s.container}>
      <button
        onClick={completeTask}
        aria-label="タスクを完了する"
        className={s.iconButton}
      >
        <div className={s.iconButtonLayer} />
        <CircleIcon />
      </button>
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
      <button
        onClick={playPomodoro}
        aria-label="ポモドーロを開始する"
        className={s.iconButton}
      >
        <div className={s.iconButtonLayer} />
        <PlayCircleIcon />
      </button>
    </li>
  );
};

export default TaskListItem;
