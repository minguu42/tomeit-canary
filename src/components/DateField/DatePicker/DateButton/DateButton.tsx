import type { MouseEventHandler } from "react";

import * as s from "./DateButton.css";

type Props = {
  date: Date | null;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const DateButton = ({ date, handleClick }: Props): JSX.Element => {
  if (date === null) {
    return <li className={s.container} />;
  }

  return (
    <li>
      <button onClick={handleClick} className={s.container} type="button">
        <div className={s.stateLayer} />
        {date.getDate()}
      </button>
    </li>
  );
};
