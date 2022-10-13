import { FC } from "react";

import StandardIconButton from "@/components/common/StandardIconButton";
import Content from "@/components/features/SideSheet/Content";
import { CircleIcon, TimerIcon } from "@/components/icons";
import * as s from "./SideSheet.css";
import {
  useRemarkedTask,
  useRemarkedTaskMutators,
} from "@/globalStates/remarkedTask";
import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";
import TitleField from "@/components/features/SideSheet/TitleField";
import ActionFiled from "@/components/features/SideSheet/ActionField";
import { useTasksMutators } from "@/globalStates/tasks";

type Props = {
  task: Task;
};

const SideSheet: FC<Props> = () => {
  const remarkedTask = useRemarkedTask();
  const { unsetRemarkedTask } = useRemarkedTaskMutators();
  const { deleteTask } = useTasksMutators();

  const handleDeleteField = () => {
    if (remarkedTask === null) return;

    deleteTask(remarkedTask.id);
    unsetRemarkedTask();
  };

  if (remarkedTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      <div className={s.name}>
        <StandardIconButton
          icon={<CircleIcon />}
          label="完了"
          onClick={() => window.alert(remarkedTask.title)}
        />
        <TitleField
          taskID={remarkedTask.id}
          initialTitle={remarkedTask.title}
        />
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
        value={
          remarkedTask.dueOn !== null
            ? formatDate(remarkedTask.dueOn, "locale")
            : ""
        }
      />
      <ActionFiled
        leadingIcon={<TimerIcon />}
        label="削除"
        onClick={handleDeleteField}
      />
    </div>
  );
};

export default SideSheet;
