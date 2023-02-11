import React from "react";

import * as s from "./NumberField.css";

type Props = {
  value: number;
  min: number;
  max: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  icon: JSX.Element;
};

export const NumberField: React.FC<Props> = ({ value, min, max, setValue, icon }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={s.container}>
      {icon}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        className={s.field}
      />
    </div>
  );
};
