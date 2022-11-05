import { FC, MouseEventHandler } from "react";

import * as s from "./DateButton.css";

type Props = {
  date: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

const DateButton: FC<Props> = ({ date, handleClick }) => {
  if (date === "") {
    return <li className={s.container} />;
  }

  return (
    <li>
      <button onClick={handleClick} className={s.container}>
        <div className={s.stateLayer} />
        {date}
      </button>
    </li>
  );
};

export default DateButton;
