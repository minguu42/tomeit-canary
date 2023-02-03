import { FC } from "react";

import { IconButton } from "@/components/IconButton";
import {
  AlarmIcon,
  AlarmOnIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  DescriptionIcon,
  PlayIcon,
} from "@/components/icons";
import { Flag } from "@/features/task/TaskList/TaskListItem/Flag";
import { Task } from "@/features/task/task";
import { formatDate } from "@/lib/formatDate";
import * as s from "./TaskListItem.css";

type Props = {
  task: Task;
};

export const TaskListItem: FC<Props> = ({ task }) => {
  const flagsExist =
    task.actualCount !== 0 || task.estimatedCount !== 0 || task.hasDoToday || task.dueOn !== null;

  if (task.completedOn !== null) {
    return (
      <li className={s.container}>
        <button onClick={() => window.alert("タスク詳細を開く")} className={s.mainCompleted}>
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
            onClick={() => window.alert("タスクを未完了にする")}
          />
        </div>
      </li>
    );
  }

  return (
    <li className={s.container}>
      <button onClick={() => window.alert("タスク詳細を開く")} className={s.main}>
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
          icon={<CircleIcon />}
          label="タスクの完了"
          onClick={() => window.alert("タスクの完了")}
        />
      </div>
      <div className={s.rightIconLayout}>
        <IconButton
          icon={<PlayIcon />}
          label="ポモドーロの実行"
          onClick={() => window.alert("ポモドーロの実行")}
        />
      </div>
    </li>
  );
};
