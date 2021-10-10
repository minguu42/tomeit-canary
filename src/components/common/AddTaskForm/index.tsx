import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AddIcon from "components/common/icons/AddIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import s from "./styles.module.scss";
import {
  isTaskResponse,
  newTask,
  tasksFilterState,
  tasksState,
} from "models/task";
import { formatDate } from "lib/format";
import { postData } from "lib/fetch";
import { useUser } from "lib/auth";

type Props = {
  title: string;
  handleTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  expectedPomodoroNum: number;
  handleExpectedPomodoroNumChange: React.ChangeEventHandler<HTMLInputElement>;
  dueOn: Date | null;
  handleDueOnChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

export const AddTaskForm = ({
  title,
  handleTitleChange,
  expectedPomodoroNum,
  handleExpectedPomodoroNumChange,
  dueOn,
  handleDueOnChange,
  handleSubmit,
}: Props): JSX.Element => (
  <form onSubmit={handleSubmit} className={s.container}>
    <AddIcon fill="#212121" />
    <input
      type="text"
      title="タスク名"
      placeholder="タスクを追加"
      value={title}
      onChange={handleTitleChange}
      required
      className={s.title}
    />
    <div className={s.hideInXS}>
      <TimerIcon fill="#666666" />
    </div>
    <input
      type="number"
      title="予想ポモドーロ数"
      value={expectedPomodoroNum}
      onChange={handleExpectedPomodoroNumChange}
      min={0}
      max={6}
      className={s.expectedNum}
    />
    <input
      type="date"
      title="期日"
      value={dueOn !== null ? formatDate(dueOn) : ""}
      onChange={handleDueOnChange}
      className={s.dueOn}
    />
    <button type="submit" hidden />
  </form>
);

const AddTaskFormContainer = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [expectedPomodoroNum, setExpectedPomodoroNum] = useState(0);
  const [dueOn, setDueOn] = useState<Date | null>(null);
  const setTasks = useSetRecoilState(tasksState);
  const user = useUser();
  const tasksFilter = useRecoilValue(tasksFilterState);

  useEffect(() => {
    const today = new Date();
    switch (tasksFilter) {
      case "Today":
        setDueOn(today);
        break;
      case "Tomorrow":
        today.setDate(today.getDate() + 1);
        setDueOn(today);
        break;
      case "Someday":
        setDueOn(null);
        break;
    }
  }, [tasksFilter]);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleExpectedPomodoroNumChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setExpectedPomodoroNum(Number(e.target.value));
    };

  const handleDueOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(new Date(e.target.value + "T00:00:00Z"));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const respBody = {
      title: title,
      expectedPomodoroNum: expectedPomodoroNum,
      dueOn: dueOn,
    };
    postData("/tasks", respBody, user)
      .then((data) => {
        if (isTaskResponse(data)) {
          setTasks((prev) => [...prev, newTask(data)]);
        }
      })
      .catch((error) => console.error(error));

    setTitle("");
    setExpectedPomodoroNum(0);
    setDueOn(null);
  };

  return (
    <AddTaskForm
      title={title}
      handleTitleChange={handleTitleChange}
      expectedPomodoroNum={expectedPomodoroNum}
      handleExpectedPomodoroNumChange={handleExpectedPomodoroNumChange}
      dueOn={dueOn}
      handleDueOnChange={handleDueOnChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTaskFormContainer;
