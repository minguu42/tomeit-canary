import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";

import Button from "@/components/common/Button";
import DateFiled from "@/components/common/DateFiled/DateFiled";
import { AddTaskIcon, AlarmIcon, CalendarMonthIcon } from "@/components/common/icons";
import NumberPicker from "@/components/common/NumberPicker";
import * as s from "./TaskAddForm.css";
import { useTasksMutators } from "@/globalStates/tasks";
import { Task } from "@/types/task";

const TaskAddForm: FC = () => {
  const [title, setTitle] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [estimatedCount, setEstimatedCount] = useState(0);
  const { addTask } = useTasksMutators();

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmitButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const newTask: Task = {
      id: Math.random() * 1_000_000_000 + 1,
      title: title,
      estimatedCount: estimatedCount,
      actualCount: 0,
      dueOn: dueOn !== "" ? new Date(dueOn) : null,
      hasDoToday: false,
      completedOn: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask(newTask);

    setTitle("");
    setDueOn("");
    setEstimatedCount(0);
  };

  return (
    <form>
      <div className={s.textFieldContainer}>
        <AddTaskIcon />
        <input
          type="text"
          value={title}
          placeholder="タスクの追加"
          onChange={handleTitleChange}
          className={s.textField}
        />
      </div>
      <div className={s.sub}>
        <DateFiled
          value={dueOn}
          setValue={setDueOn}
          icon={<CalendarMonthIcon />}
          label="期限の入力"
        />
        <NumberPicker
          value={estimatedCount}
          defaultValue={0}
          min={0}
          max={6}
          setValue={setEstimatedCount}
          icon={<AlarmIcon />}
        />
        <div className={s.spacer} />
        <Button type="tonal" labelText="追加" onClick={handleSubmitButtonClick} />
      </div>
    </form>
  );
};

export default TaskAddForm;
