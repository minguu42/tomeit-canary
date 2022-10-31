import { FC } from "react";

import * as s from "./DateFiled.css";
import { formatDate } from "@/lib/formatDate";

type Props = {
  icon: JSX.Element;
  name: string;
  value: Date | null;
};

const DateFiled: FC<Props> = ({ icon, name, value }) => (
  <div className={s.container}>
    {icon}
    <div className={s.name}>{name}</div>
    <div className={s.spacer} />
    <div className={s.value}>{value !== null ? formatDate(value, "locale") : "なし"}</div>
  </div>
);

export default DateFiled;
