import type { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from "react";

import * as s from "./TextField.css";

type Props = {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon: ReactNode;
};

export const TextField = ({ value, placeholder, setValue, icon }: Props): JSX.Element => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={s.container}>
      {icon}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={s.inputText}
      />
    </div>
  );
};
