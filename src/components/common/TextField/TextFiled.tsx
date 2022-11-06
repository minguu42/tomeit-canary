import { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";

import * as s from "./TextField.css";

type Props = {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon: JSX.Element;
};

const TextFiled: FC<Props> = ({ value, placeholder, setValue, icon }) => {
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

export default TextFiled;
