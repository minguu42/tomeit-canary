import { ChangeEventHandler, FC, useState } from "react";

import StandardIconButton from "@/components/common/StandardIconButton";
import Content from "@/components/features/SideSheet/Content";
import { CircleIcon, TimerIcon } from "@/components/icons";
import * as s from "./SideSheet.css";
import { useRemarkedTask } from "@/globalStates/remarkedTask";
import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";
import TitleField from "@/components/features/SideSheet/TitleField";

type Props = {
  task: Task;
};

const SideSheet: FC<Props> = () => {
  const remarkedTask = useRemarkedTask();

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
    </div>
  );
};

export default SideSheet;
