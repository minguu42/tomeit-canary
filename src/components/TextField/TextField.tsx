import React from "react";

import * as s from "./TextField.css";

type Props = {
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  icon: React.ReactNode;
};

export const TextField: React.FC<Props> = ({ value, placeholder, setValue, icon }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
