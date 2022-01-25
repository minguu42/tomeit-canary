import { FormEventHandler, SyntheticEvent, useState, VFC } from "react";
import cn from "classnames";

import s from "./TaskAddForm.module.css";
import { AddTaskIcon, AlarmIcon } from "@/components/common/icons";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import { Task } from "@/models/task";
import { formatDate } from "@/lib/format";

const TaskAddForm: VFC = () => {
  const [title, setTitle] = useState("");
  const [expectedPomodoroNum, setExpectedPomodoroNum] = useState(0);
  const [dueOn, setDueOn] = useState<Date | null>(null);
  const { addTask } = useTasksMutators();

  const handleTitleChange: FormEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleExpectedPomodoroNumChange: FormEventHandler<HTMLInputElement> = (
    event
  ) => {
    setExpectedPomodoroNum(Number(event.currentTarget.value));
  };

  const handleDueOnChange: FormEventHandler<HTMLInputElement> = (event) => {
    setDueOn(new Date(event.currentTarget.value));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const task: Task = {
      id: new Date().getMilliseconds(),
      title: title,
      expectedPomodoroNum: expectedPomodoroNum,
      actualPomodoroNum: 0,
      dueOn: dueOn,
      isCompleted: false,
      completedOn: null,
    };
    addTask(task);

    setTitle("");
    setExpectedPomodoroNum(0);
    setDueOn(null);
  };

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
          value={expectedPomodoroNum}
          onChange={handleExpectedPomodoroNumChange}
          min={0}
          max={6}
          className={s.expectedPomodoroNumInput}
        />
        <input
          type="date"
          value={dueOn !== null ? formatDate(dueOn) : ""}
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
