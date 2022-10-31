import { FC } from "react";

import * as s from "./NumberFiled.css";

type Props = {
  icon: JSX.Element;
  name: string;
  value: number;
};

const NumberField: FC<Props> = ({ icon, name, value }) => (
  <div className={s.container}>
    {icon}
    <div className={s.name}>{name}</div>
    <div className={s.spacer} />
    <div className={s.value}>{value}</div>
  </div>
);

export default NumberField;
