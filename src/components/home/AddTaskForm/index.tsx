import React, { ChangeEventHandler, useState } from "react";

import AddIcon from "components/common/icons/AddIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/home/AddTaskForm/AddTaskForm.module.scss";
import { Task } from "types/task";
import { formatDate } from "lib/format";

type Props = {
  title: string;
  handleTitleChange: ChangeEventHandler<HTMLInputElement>;
  expectedPomodoroNum: number;
  handleExpectedPomodoroNumChange: ChangeEventHandler<HTMLInputElement>;
  dueOn: Date | null;
  handleDueOnChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

type ContainerProps = {
  addTask: (task: Task) => void;
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
  <form onSubmit={handleSubmit} className={styles.outer}>
    <div className={styles.leftWrapper}>
      <AddIcon fill="#212121" />
      <input
        type="text"
        title="タスク名"
        placeholder="タスクを追加"
        value={title}
        onChange={handleTitleChange}
        required
      />
    </div>
    <div className={styles.rightWrapper}>
      <TimerIcon fill="#666666" />
      <input
        type="number"
        title="予想ポモドーロ数"
        value={expectedPomodoroNum}
        onChange={handleExpectedPomodoroNumChange}
        min={0}
        max={6}
      />
      <input
        type="date"
        title="期日"
        value={dueOn !== null ? formatDate(dueOn) : ""}
        onChange={handleDueOnChange}
      />
    </div>
    <button type="submit" hidden />
  </form>
);

const AddTaskFormContainer = ({ addTask }: ContainerProps): JSX.Element => {
  const [title, setTitle] = useState("");
  const [expectedPomodoroNum, setExpectedPomodoroNum] = useState(0);
  const [dueOn, setDueOn] = useState<Date | null>(null);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleExpectedPomodoroNumChange: ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setExpectedPomodoroNum(Number(e.target.value));
    };

  const handleDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(new Date(e.target.value + "T00:00:00Z"));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const task: Task = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      expectedPomodoroNum: expectedPomodoroNum,
      actualPomodoroNum: 0,
      dueOn: dueOn,
      isCompleted: false,
      completedAt: null,
    };

    addTask(task);

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
