import { FC } from "react";

import * as s from "./AddTaskForm.css";
import { AddTaskIcon } from "@/components/icons";

const AddTaskForm: FC = () => (
  <form className={s.container}>
    <div className={s.textFieldContainer}>
      <AddTaskIcon className={s.leadingIcon} />
      <input type="text" placeholder="タスクの追加" className={s.textField} />
    </div>
    <div className={s.sub}>
      <p>カレンダー</p>
      <button>追加</button>
    </div>
  </form>
);

export default AddTaskForm;
