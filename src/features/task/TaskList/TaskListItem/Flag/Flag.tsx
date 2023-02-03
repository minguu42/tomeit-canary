import type { ReactNode } from "react";

import * as s from "./Flag.css";

type Props = {
  icon: ReactNode;
  labelText: string;
};

export const Flag = ({ icon, labelText }: Props): JSX.Element => {
  return (
    <div className={s.container}>
      {icon}
      {labelText}
    </div>
  );
};
