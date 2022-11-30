import { FC, MouseEventHandler } from "react";

import * as s from "./Action.css";

type Props = {
  leadingIcon: JSX.Element;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Action: FC<Props> = ({ leadingIcon, label, onClick }) => {
  return (
    <button onClick={onClick} className={s.container}>
      <div className={s.stateLayer} />
      {leadingIcon}
      {label}
    </button>
  );
};
