import React, { ChangeEventHandler, useState } from "react";

import AddIcon from "components/common/icons/AddIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/home/AddTaskForm/AddTaskForm.module.scss";
import { Task } from "lib/task";

type ContainerProps = {
  addTask: (task: Task) => void;
};

type Props = {
  name: string;
  handleNameChange: ChangeEventHandler<HTMLInputElement>;
  expectedPomodoroNum: number;
  handleExpectedPomodoroNumChange: ChangeEventHandler<HTMLInputElement>;
  deadline: string;
  handleDeadlineChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

export const AddTaskForm = ({
  name,
  handleNameChange,
  expectedPomodoroNum,
  handleExpectedPomodoroNumChange,
  deadline,
  handleDeadlineChange,
  handleSubmit,
}: Props): JSX.Element => (
  <form onSubmit={handleSubmit} className={styles.outer}>
    <div className={styles.leftWrapper}>
      <AddIcon fill="#212121" />
      <input
        type="text"
        title="タスク名"
        placeholder="タスクを追加"
        value={name}
        onChange={handleNameChange}
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
        value={deadline}
        onChange={handleDeadlineChange}
      />
    </div>
    <button type="submit" hidden />
  </form>
);

const AddTaskFormContainer = ({ addTask }: ContainerProps): JSX.Element => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState("");

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handlePriorityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPriority(Number(e.target.value));
  };

  const handleDeadlineChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const task: Task = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      priority: priority,
      deadline: deadline || "0001-01-01",
      isDone: false,
      pomodoroCount: 0,
    };

    addTask(task);

    setName("");
    setPriority(0);
    setDeadline("");
  };

  return (
    <AddTaskForm
      name={name}
      handleNameChange={handleNameChange}
      expectedPomodoroNum={priority}
      handleExpectedPomodoroNumChange={handlePriorityChange}
      deadline={deadline}
      handleDeadlineChange={handleDeadlineChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTaskFormContainer;
