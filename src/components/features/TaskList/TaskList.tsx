import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";

import AddTaskForm from "@/components/features/TaskList/AddTaskForm";
import TaskListItem from "@/components/features/TaskList/TaskListItem";
import { Task } from "@/types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1",
    estimatedCount: 2,
    actualCount: 4,
    dueOn: new Date(),
    hasDoToday: true,
    completedOn: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "タスク2",
    estimatedCount: 0,
    actualCount: 0,
    dueOn: null,
    hasDoToday: false,
    completedOn: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const TaskList: FC = () => {
  const [name, setName] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [primary, setPrimary] = useState("");

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(e.target.value);
  };

  const onPrimaryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPrimary(e.target.value);
  };

  const onSubmitButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.alert(`name: ${name}, dueOn: ${dueOn}, primary: ${primary}`);
  };

  return (
    <>
      <AddTaskForm
        name={name}
        dueOn={dueOn}
        primary={primary}
        onNameChange={onNameChange}
        onDueOnChange={onDueOnChange}
        onPrimaryChange={onPrimaryChange}
        onSubmitButtonClick={onSubmitButtonClick}
      />
      <ul>
        {tasks.map((task) => (
          <TaskListItem task={task} key={task.id} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
