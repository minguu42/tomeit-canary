import { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";

import * as s from "./NumberFiled.css";

type Props = {
  value: number;
  defaultValue: number;
  min: number;
  max: number;
  setValue: Dispatch<SetStateAction<number>>;
  icon: JSX.Element;
};

const NumberFiled: FC<Props> = ({ value, defaultValue, min, max, setValue, icon }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={s.container}>
      {icon}
      <input
        type="number"
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={handleChange}
        className={s.field}
      />
    </div>
  );
};

export default NumberFiled;
