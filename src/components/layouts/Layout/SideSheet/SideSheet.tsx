import { FC } from "react";

import { IconButton } from "@/components/common/IconButton";
import {
  AddIcon,
  AlarmIcon,
  AlarmOnIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  CloseIcon,
  DeleteIcon,
  RemoveIcon,
} from "@/components/common/icons";
import { TitleField } from "@/components/layouts/Layout/SideSheet/TitleField";
import { NumberField } from "@/components/layouts/Layout/SideSheet/NumberField/NumberField";
import { DateField } from "@/components/layouts/Layout/SideSheet/DateField";
import { Action } from "@/components/layouts/Layout/SideSheet/Action";
import * as s from "./SideSheet.css";
import { useRemarkedTask, useRemarkedTaskMutators } from "@/stores/remarkedTask";
import { useTasksMutators } from "@/stores/tasks";
import { Task } from "@/types/task";

export const SideSheet: FC = () => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const { toggleHasDoToday, doneTask, undoneTask, deleteTask } = useTasksMutators();

  const handleToggleHasDoTodayField = () => {
    if (remarkedTask === null) {
      return;
    }
    toggleHasDoToday(remarkedTask.id);
    const newRemarkedTask: Task = {
      ...remarkedTask,
      hasDoToday: !remarkedTask.hasDoToday,
    };
    setRemarkedTask(newRemarkedTask);
  };

  const handleCircleButtonClick = () => {
    if (remarkedTask === null) {
      return;
    }

    doneTask(remarkedTask.id);
    const newRemarkedTask: Task = {
      ...remarkedTask,
      completedOn: new Date(),
    };
    setRemarkedTask(newRemarkedTask);
  };

  const handleCheckCircleButtonClick = () => {
    if (remarkedTask === null) {
      return;
    }

    undoneTask(remarkedTask.id);
    const newRemarkedTask: Task = {
      ...remarkedTask,
      completedOn: null,
    };
    setRemarkedTask(newRemarkedTask);
  };

  const handleDeleteActionClick = () => {
    if (remarkedTask === null) {
      return;
    }

    deleteTask(remarkedTask.id);
    unsetRemarkedTask();
  };

  if (remarkedTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        {remarkedTask.completedOn === null ? (
          <IconButton
            icon={<CircleIcon />}
            label="タスクの完了"
            onClick={handleCircleButtonClick}
          />
        ) : (
          <IconButton
            icon={<CheckCircleIcon />}
            label="タスクの完了を取り消し"
            onClick={handleCheckCircleButtonClick}
          />
        )}
        <TitleField
          taskID={remarkedTask.id}
          initialTitle={remarkedTask.title}
          isCompleted={remarkedTask.completedOn !== null}
        />
        <IconButton icon={<CloseIcon />} label="サイドシートを閉じる" onClick={unsetRemarkedTask} />
      </div>
      <NumberField
        icon={<AlarmIcon />}
        name="推定ポモドーロ数"
        value={remarkedTask.estimatedCount}
      />
      <NumberField icon={<AlarmOnIcon />} name="実ポモドーロ数" value={remarkedTask.actualCount} />
      <DateField icon={<CalendarIcon />} name="期限" value={remarkedTask.dueOn} />
      {remarkedTask.hasDoToday ? (
        <Action
          leadingIcon={<RemoveIcon />}
          label="「今日やること」から外す"
          onClick={handleToggleHasDoTodayField}
        />
      ) : (
        <Action
          leadingIcon={<AddIcon />}
          label="「今日やること」に追加"
          onClick={handleToggleHasDoTodayField}
        />
      )}
      <Action leadingIcon={<DeleteIcon />} label="タスクの削除" onClick={handleDeleteActionClick} />
    </div>
  );
};
