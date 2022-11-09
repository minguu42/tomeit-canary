import { FC, MouseEventHandler } from "react";

import * as s from "./DateButton.css";

type Props = {
  date: Date | null;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const DateButton: FC<Props> = ({ date, handleClick }) => {
  if (date === null) {
    return <li className={s.container} />;
  }

  return (
    <li>
      <button onClick={handleClick} className={s.container}>
        <div className={s.stateLayer} />
        {date.getDate()}
      </button>
    </li>
  );
};
