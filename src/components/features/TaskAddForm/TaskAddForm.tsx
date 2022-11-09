import { FC, MouseEventHandler, useState } from "react";

import { Button } from "@/components/common/Button";
import { DateField } from "@/components/common/DateField/DateField";
import { AddTaskIcon, AlarmIcon, CalendarMonthIcon } from "@/components/common/icons";
import { NumberField } from "@/components/common/NumberField";
import { TextFiled } from "@/components/common/TextField";
import * as s from "./TaskAddForm.css";
import { useTasksMutators } from "@/globalStates/tasks";
import { Task } from "@/types/task";

export const TaskAddForm: FC = () => {
  const [title, setTitle] = useState("");
  const [dueOn, setDueOn] = useState<Date | null>(null);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const { addTask } = useTasksMutators();

  const handleSubmitButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (title === "") {
      return;
    }

    const newTask: Task = {
      id: Math.random() * 1_000_000_000 + 1,
      title: title,
      estimatedCount: estimatedCount,
      actualCount: 0,
      dueOn: dueOn,
      hasDoToday: false,
      completedOn: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask(newTask);

    setTitle("");
    setDueOn(null);
    setEstimatedCount(0);
  };

  return (
    <form>
      <TextFiled
        value={title}
        placeholder="タスクの追加"
        setValue={setTitle}
        icon={<AddTaskIcon />}
      />
      <div className={s.sub}>
        <DateField
          value={dueOn}
          setValue={setDueOn}
          icon={<CalendarMonthIcon />}
          label="期限の入力"
        />
        <NumberField
          value={estimatedCount}
          min={0}
          max={6}
          setValue={setEstimatedCount}
          icon={<AlarmIcon />}
        />
        <div className={s.spacer} />
        <Button variant="tonal" labelText="追加" onClick={handleSubmitButtonClick} />
      </div>
    </form>
  );
};
