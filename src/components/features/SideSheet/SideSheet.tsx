import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import Content from "@/components/features/SideSheet/Content";
import { CircleIcon, TimerIcon } from "@/components/common/icons";
import * as s from "./SideSheet.css";
import { useRemarkedTask, useRemarkedTaskMutators } from "@/globalStates/remarkedTask";
import { formatDate } from "@/lib/formatDate";
import TitleField from "@/components/features/SideSheet/TitleField";
import ActionFiled from "@/components/features/SideSheet/ActionField";
import { useTasksMutators } from "@/globalStates/tasks";
import { Task } from "@/types/task";

const SideSheet: FC = () => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const { toggleHasDoToday, deleteTask } = useTasksMutators();

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

  const handleDeleteField = () => {
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
      <div className={s.name}>
        <IconButton
          icon={<CircleIcon />}
          label="完了"
          onClick={() => window.alert(remarkedTask.title)}
        />
        <TitleField taskID={remarkedTask.id} initialTitle={remarkedTask.title} />
      </div>
      <div className={s.divider} />
      <Content
        leadingIcon={<TimerIcon />}
        name="推定ポモドーロ数"
        value={String(remarkedTask.estimatedCount)}
      />
      <Content
        leadingIcon={<TimerIcon />}
        name="実ポモドーロ数"
        value={String(remarkedTask.actualCount)}
      />
      <Content
        leadingIcon={<TimerIcon />}
        name="期限"
        value={remarkedTask.dueOn !== null ? formatDate(remarkedTask.dueOn, "locale") : ""}
      />
      {remarkedTask.hasDoToday ? (
        <ActionFiled
          leadingIcon={<TimerIcon />}
          label="「今日やること」から外す"
          onClick={handleToggleHasDoTodayField}
        />
      ) : (
        <ActionFiled
          leadingIcon={<TimerIcon />}
          label="「今日やること」に追加"
          onClick={handleToggleHasDoTodayField}
        />
      )}
      <ActionFiled leadingIcon={<TimerIcon />} label="削除" onClick={handleDeleteField} />
    </div>
  );
};

export default SideSheet;
