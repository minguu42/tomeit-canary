import { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";

import * as s from "./NumberField.css";

type Props = {
  value: number;
  min: number;
  max: number;
  setValue: Dispatch<SetStateAction<number>>;
  icon: JSX.Element;
};

export const NumberField: FC<Props> = ({ value, min, max, setValue, icon }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
