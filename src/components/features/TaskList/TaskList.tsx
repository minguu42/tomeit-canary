import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import AddTaskForm from "@/components/features/TaskList/AddTaskForm";

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
    <AddTaskForm
      name={name}
      dueOn={dueOn}
      primary={primary}
      onNameChange={onNameChange}
      onDueOnChange={onDueOnChange}
      onPrimaryChange={onPrimaryChange}
      onSubmitButtonClick={onSubmitButtonClick}
    />
  );
};

export default TaskList;
