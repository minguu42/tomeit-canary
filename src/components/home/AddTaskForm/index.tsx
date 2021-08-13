import React, { ChangeEventHandler, useState } from "react";

import AddIcon from "components/common/icons/AddIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/home/AddTaskForm/AddTaskForm.module.scss";

type Props = {
  title: string;
  handleTitleChange: ChangeEventHandler<HTMLInputElement>;
  expectedPomodoroNum: number;
  handleExpectedPomodoroNumChange: ChangeEventHandler<HTMLInputElement>;
  dueOn: string;
  handleDueOnChange: ChangeEventHandler<HTMLInputElement>;
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
        value={dueOn}
        onChange={handleDueOnChange}
      />
    </div>
    <button type="submit" hidden />
  </form>
);

const AddTaskFormContainer = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [expectedPomodoroNum, setExpectedPomodoroNum] = useState(0);
  const [dueOn, setDueOn] = useState("");

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleExpectedPomodoroNumChange: ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setExpectedPomodoroNum(Number(e.target.value));
    };

  const handleDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // const task: Task = {
    //   id: Math.floor(Math.random() * 1000),
    //   name: name,
    //   priority: priority,
    //   deadline: deadline || "0001-01-01",
    //   isDone: false,
    //   pomodoroCount: 0,
    // };

    // TODO: タスクリストにタスクを追加する

    setTitle("");
    setExpectedPomodoroNum(0);
    setDueOn("");
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
