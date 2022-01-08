import type { VFC } from "react";

import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import PomodoroCaption from "@/components/models/pomodoro/PomodoroCaption";
import s from "./TaskListItem.module.css";
import type { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

type Props = {
  task: Task;
};

const TaskListItem: VFC<Props> = ({ task }) => {
  return (
    <li className={s.container}>
      <button className={s.iconButton}>
        <div className={s.iconButtonLayer} />
        <CircleIcon />
      </button>
      <div className={s.main}>
        <p className={s.title}>{task.title}</p>
        <PomodoroCaption
          expectedPomodoroNum={task.expectedPomodoroNum}
          actualPomodoroNum={task.actualPomodoroNum}
        />
      </div>
      {task.dueOn && <p className={s.dueOnCaption}>{formatDate(task.dueOn)}</p>}
      <button className={s.iconButton}>
        <div className={s.iconButtonLayer} />
        <PlayCircleIcon />
      </button>
    </li>
  );
};

export default TaskListItem;
