import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import {
  CalendarMonthIcon,
  CircleIcon,
  DescriptionIcon,
  TimerIcon,
} from "@/components/icons";
import * as s from "./TaskListItem.css";
import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";

type Props = {
  task: Task;
};

const TaskListItem: FC<Props> = ({ task }) => {
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
      <IconButton
        icon={<CircleIcon />}
        label="タスクの完了"
        onClick={() => window.alert("タスクの完了")}
      />
      <div className={s.main}>
        <p className={s.title}>{task.title}</p>
        {flagsExist && (
          <div className={s.flags}>
            {task.actualCount !== 0 && actualCountFlag}
            {task.estimatedCount !== 0 && estimatedCountFlag}
            {task.hasDoToday && hasDoTodayFlag}
            {task.dueOn !== null && dueOnFlag}
          </div>
        )}
      </div>
    </li>
  );
};

export default TaskListItem;
