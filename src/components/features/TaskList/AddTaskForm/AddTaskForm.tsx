import { ChangeEventHandler, FC, MouseEventHandler } from "react";

import * as s from "./AddTaskForm.css";
import { AddTaskIcon } from "@/components/icons";
import FilledTonalButton from "@/components/common/FilledTonalButton";

type Props = {
  name: string;
  dueOn: string;
  primary: string;
  onNameChange: ChangeEventHandler<HTMLInputElement>;
  onDueOnChange: ChangeEventHandler<HTMLInputElement>;
  onPrimaryChange: ChangeEventHandler<HTMLInputElement>;
  onSubmitButtonClick: MouseEventHandler<HTMLButtonElement>;
};

const AddTaskForm: FC<Props> = ({
  name,
  dueOn,
  primary,
  onNameChange,
  onDueOnChange,
  onPrimaryChange,
  onSubmitButtonClick,
}) => (
  <form className={s.container}>
    <div className={s.textFieldContainer}>
      <AddTaskIcon className={s.leadingIcon} />
      <input
        type="text"
        value={name}
        placeholder="タスクの追加"
        onChange={onNameChange}
        className={s.textField}
      />
    </div>
    <div className={s.sub}>
      <input
        type="date"
        value={dueOn}
        onChange={onDueOnChange}
        className={s.dateField}
      />
      <input
        type="number"
        value={primary}
        defaultValue={0}
        min={0}
        max={6}
        onChange={onPrimaryChange}
        className={s.numberField}
      />
      <div className={s.spacer} />
      <FilledTonalButton labelText="送信" onClick={onSubmitButtonClick} />
    </div>
  </form>
);

export default AddTaskForm;
