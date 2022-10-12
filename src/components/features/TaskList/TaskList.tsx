import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";

import AddTaskForm from "@/components/features/TaskList/AddTaskForm";
import TaskListItem from "@/components/features/TaskList/TaskListItem";
import { useTasks, useTasksMutators } from "@/globalStates/tasks";
import { Task } from "@/types/task";

const TaskList: FC = () => {
  const [title, setTitle] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [estimatedCount, setEstimatedCount] = useState("");
  const tasks = useTasks();
  const { addTask } = useTasksMutators();

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(e.target.value);
  };

  const onEstimatedCountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEstimatedCount(e.target.value);
  };

  const onSubmitButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
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
    <>
      <AddTaskForm
        name={title}
        dueOn={dueOn}
        primary={estimatedCount}
        onNameChange={onNameChange}
        onDueOnChange={onDueOnChange}
        onPrimaryChange={onEstimatedCountChange}
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
