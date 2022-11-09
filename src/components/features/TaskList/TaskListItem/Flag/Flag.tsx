import { FC } from "react";

import * as s from "./Flag.css";

type Props = {
  icon: JSX.Element;
  labelText: string;
};

export const Flag: FC<Props> = ({ icon, labelText }) => (
  <div className={s.container}>
    {icon}
    {labelText}
  </div>
);
