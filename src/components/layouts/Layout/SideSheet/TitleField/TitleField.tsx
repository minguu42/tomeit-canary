import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from "react";

import * as s from "./TitleField.css";
import { useTasksMutators } from "@/globalStates/tasks";

type Props = {
  taskID: number;
  initialTitle: string;
};

const TitleField: FC<Props> = ({ taskID, initialTitle }) => {
  const [title, setTitle] = useState("");
  const { changeTaskTitle } = useTasksMutators();

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    changeTaskTitle(taskID, title);
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <input type="text" value={title} onChange={handleTitleChange} className={s.textbox} />
    </form>
  );
};

export default TitleField;
