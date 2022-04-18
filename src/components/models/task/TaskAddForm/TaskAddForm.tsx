import { FC } from "react";
import cn from "classnames";

import s from "./TaskAddForm.module.css";
import { AddTaskIcon, AlarmIcon } from "@/components/common/icons";
import { useTaskAddForm } from "@/components/models/task/TaskAddForm/TaskAddForm.hooks";

const TaskAddForm: FC = () => {
  const {
    title,
    estimatedPomoNum,
    dueOn,
    handleTitleChange,
    handleEstimatedPomoNumChange,
    handleDueOnChange,
    handleSubmit,
  } = useTaskAddForm();

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.top}>
        <AddTaskIcon />
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="タスクを追加する"
          required
          className={s.titleInput}
        />
      </div>
      <div className={s.options}>
        <AlarmIcon size={20} />
        <input
          type="number"
          value={estimatedPomoNum}
          onChange={handleEstimatedPomoNumChange}
          min={0}
          max={6}
          className={s.expectedPomodoroNumInput}
        />
        <input
          type="date"
          value={dueOn}
          onChange={handleDueOnChange}
          className={s.dueOnInput}
        />
        <div className={s.spacer} />
        <button
          type="submit"
          disabled={title === ""}
          className={cn(s.button, { [s.buttonDisabledColor]: title === "" })}
        >
          <div
            className={cn(s.buttonLayer, { [s.hideButtonLayer]: title === "" })}
          />
          追加
        </button>
      </div>
    </form>
  );
};

export default TaskAddForm;
