import React, { ChangeEventHandler } from "react";

import AddIcon from "components/common/icons/AddIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import styles from "./styles.module.scss";
import { Task } from "types/task";
import { formatDate } from "lib/format";
import {
  useTitleInput,
  useExpectedPomodoroNumberInput,
  useDueOnInput,
} from "./hooks";

type Props = {
  title: string;
  handleTitleChange: ChangeEventHandler<HTMLInputElement>;
  expectedPomodoroNumber: number;
  handleExpectedPomodoroNumberChange: ChangeEventHandler<HTMLInputElement>;
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
  expectedPomodoroNumber,
  handleExpectedPomodoroNumberChange,
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
        value={expectedPomodoroNumber}
        onChange={handleExpectedPomodoroNumberChange}
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
  const { title, handleTitleChange, resetTitle } = useTitleInput("");
  const {
    expectedPomodoroNumber,
    handleExpectedPomodoroNumberChange,
    resetExpectedPomodoroNumber,
  } = useExpectedPomodoroNumberInput(0);
  const { dueOn, handleDueOnChange, resetDueOn } = useDueOnInput();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const task: Task = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      expectedPomodoroNumber: expectedPomodoroNumber,
      actualPomodoroNumber: 0,
      dueOn: dueOn,
      isCompleted: false,
      completedOn: null,
    };

    addTask(task);

    resetTitle();
    resetExpectedPomodoroNumber();
    resetDueOn();
  };

  return (
    <AddTaskForm
      title={title}
      handleTitleChange={handleTitleChange}
      expectedPomodoroNumber={expectedPomodoroNumber}
      handleExpectedPomodoroNumberChange={handleExpectedPomodoroNumberChange}
      dueOn={dueOn}
      handleDueOnChange={handleDueOnChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTaskFormContainer;
