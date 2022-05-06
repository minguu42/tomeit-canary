import { useState, FormEventHandler, SyntheticEvent } from "react";
import { useTaskActions } from "@/hooks/fetch";

type Values = {
  title: string;
  estimatedPomoNum: number;
  dueOn: string;
  handleTitleChange: FormEventHandler<HTMLInputElement>;
  handleEstimatedPomoNumChange: FormEventHandler<HTMLInputElement>;
  handleDueOnChange: FormEventHandler<HTMLInputElement>;
  handleSubmit: (event: SyntheticEvent) => void;
};

export const useTaskAddForm = (): Values => {
  const [title, setTitle] = useState("");
  const [estimatedPomoNum, setEstimatedPomoNum] = useState(0);
  const [dueOn, setDueOn] = useState("");
  const { postTasks } = useTaskActions();

  const handleTitleChange: FormEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };
  const handleEstimatedPomoNumChange: FormEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEstimatedPomoNum(Number(event.currentTarget.value));
  };
  const handleDueOnChange: FormEventHandler<HTMLInputElement> = (event) => {
    setDueOn(event.currentTarget.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    postTasks(title, estimatedPomoNum, dueOn).catch((error) => {
      console.error(error);
    });

    setTitle("");
    setEstimatedPomoNum(0);
    setDueOn("");
  };

  return {
    title,
    estimatedPomoNum,
    dueOn,
    handleTitleChange,
    handleEstimatedPomoNumChange,
    handleDueOnChange,
    handleSubmit,
  };
};
