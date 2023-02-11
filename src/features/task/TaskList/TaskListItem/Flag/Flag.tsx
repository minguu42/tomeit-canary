import React from "react";

import * as s from "./Flag.css";

type Props = {
  icon: React.ReactNode;
  labelText: string;
};

export const Flag: React.FC<Props> = ({ icon, labelText }) => {
  return (
    <div className={s.container}>
      {icon}
      {labelText}
    </div>
  );
};
