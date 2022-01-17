import type { VFC } from "react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import PomodoroCaption from "@/components/models/pomodoro/PomodoroCaption";
import s from "./TaskListItem.module.css";
import type { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  task: Task;
  featuredTask: Task | null;
  setFeaturedTask: (task: Task | null) => void;
};

const TaskListItem: VFC<Props> = ({ task, featuredTask, setFeaturedTask }) => {
  const closeTaskSideSheet = () => {
    setFeaturedTask(null);
  };

  return (
    <li className={s.container}>
      <button aria-label="タスクを完了する" className={s.iconButton}>
        <div className={s.iconButtonLayer} />
        <CircleIcon />
      </button>
      <button
        onClick={
          task === featuredTask
            ? closeTaskSideSheet
            : () => {
                setFeaturedTask(task);
              }
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
      <button aria-label="ポモドーロを開始する" className={s.iconButton}>
        <div className={s.iconButtonLayer} />
        <PlayCircleIcon />
      </button>
    </li>
  );
};

export default TaskListItem;
