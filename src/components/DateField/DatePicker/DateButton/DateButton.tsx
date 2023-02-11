import React from "react";

import * as s from "./DateButton.css";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  date: Date | null;
};

export const DateButton: React.FC<Props> = ({ date, onClick }) => {
  if (date === null) {
    return <li className={s.container} />;
  }

  return (
    <li>
      <button onClick={onClick} className={s.container} type="button">
        <div className={s.stateLayer} />
        {date.getDate()}
      </button>
    </li>
  );
};
