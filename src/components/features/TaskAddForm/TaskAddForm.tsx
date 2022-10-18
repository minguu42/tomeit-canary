import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";

import { AddTaskIcon } from "@/components/icons";
import FilledTonalButton from "@/components/common/FilledTonalButton";
import * as s from "./TaskAddForm.css";
import { Task } from "@/types/task";
import { useTasksMutators } from "@/globalStates/tasks";

const TaskAddForm: FC = () => {
  const [title, setTitle] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [estimatedCount, setEstimatedCount] = useState("");
  const { addTask } = useTasksMutators();

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(e.target.value);
  };

  const handleEstimatedCountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEstimatedCount(e.target.value);
  };

  const handleSubmitButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const newTask: Task = {
      id: Math.random() * 1000_000_000 + 1,
      title: title,
      estimatedCount: Number(estimatedCount),
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
    setEstimatedCount("");
  };

  return (
    <form className={s.container}>
      <div className={s.textFieldContainer}>
        <AddTaskIcon className={s.leadingIcon} />
        <input
          type="text"
          value={title}
          placeholder="タスクの追加"
          onChange={handleTitleChange}
          className={s.textField}
        />
      </div>
      <div className={s.sub}>
        <input type="date" value={dueOn} onChange={handleDueOnChange} className={s.dateField} />
        <input
          type="number"
          value={estimatedCount}
          defaultValue={0}
          min={0}
          max={6}
          onChange={handleEstimatedCountChange}
          className={s.numberField}
        />
        <div className={s.spacer} />
        <FilledTonalButton labelText="追加" onClick={handleSubmitButtonClick} />
      </div>
    </form>
  );
};

export default TaskAddForm;