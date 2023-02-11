import { MouseEventHandler, useState } from "react";

import { Button } from "@/components/Button";
import { DateFiled } from "@/components/DateField";
import { AddTaskIcon, AlarmIcon, CalendarIcon } from "@/components/icons";
import { NumberField } from "@/components/NumberField";
import { TextField } from "@/components/TextField";
import * as s from "./TaskAddForm.css";
import { Task } from "@/features/task/task";
import { useTRPC } from "@/hooks/useTRPC";

export const TaskAddForm = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [dueOn, setDueOn] = useState<Date | null>(null);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const trpc = useTRPC();

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

    void trpc.task.create.mutate();

    setTitle("");
    setDueOn(null);
    setEstimatedCount(0);
  };

  return (
    <form>
      <TextField
        value={title}
        placeholder="タスクの追加"
        setValue={setTitle}
        icon={<AddTaskIcon />}
      />
      <div className={s.sub}>
        <DateFiled value={dueOn} setValue={setDueOn} icon={<CalendarIcon />} label="期限の入力" />
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
