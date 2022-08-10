import { FC, MouseEventHandler } from "react";

import * as s from "./FilledButton.css";

type Props = {
  icon: JSX.Element;
  labelText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const FilledButton: FC<Props> = ({ icon, labelText, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={s.container}>
    <div className={s.stateLayer} />
    <div className={s.icon}>{icon}</div>
    <p className={s.labelText}>{labelText}</p>
  </button>
);

export default FilledButton;
