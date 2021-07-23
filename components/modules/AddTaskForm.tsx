import React, { ChangeEventHandler, useState } from "react";

import styles from "styles/components/modules/AddTaskForm.module.scss";
import AddTaskIcon from "components/icons/AddTaskIcon";
import FlagIcon from "components/icons/FlagIcon";
import { Task } from "components/parts/TaskCard";

type ContainerProps = {
  addTask: (task: Task) => void;
};

type Props = {
  name: string;
  handleNameChange: ChangeEventHandler<HTMLInputElement>;
  priority: number;
  handlePriorityChange: ChangeEventHandler<HTMLInputElement>;
  deadline: string;
  handleDeadlineChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

const AddTaskForm = ({
  name,
  handleNameChange,
  priority,
  handlePriorityChange,
  deadline,
  handleDeadlineChange,
  handleSubmit,
}: Props): JSX.Element => (
  <form onSubmit={handleSubmit} className={styles.outer}>
    <div className={styles.leftWrapper}>
      <AddTaskIcon fill="#666666" />
      <input
        type="text"
        title="タスク名"
        placeholder="タスクを追加"
        value={name}
        onChange={handleNameChange}
        required
        className={styles.inputName}
      />
    </div>
    <div className={styles.rightWrapper}>
      <FlagIcon fill="#666666" />
      <input
        type="number"
        title="優先度"
        value={priority}
        onChange={handlePriorityChange}
        min={0}
        max={3}
        className={styles.priorityInput}
      />
      <input
        type="date"
        title="期日"
        value={deadline}
        onChange={handleDeadlineChange}
        className={styles.deadlineInput}
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
      priority={priority}
      handlePriorityChange={handlePriorityChange}
      deadline={deadline}
      handleDeadlineChange={handleDeadlineChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTaskFormContainer;
