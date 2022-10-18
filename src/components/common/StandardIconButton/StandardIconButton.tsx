import { FC, MouseEventHandler } from "react";

import * as s from "./StandardIconButton.css";

type Props = {
  icon: JSX.Element;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const StandardIconButton: FC<Props> = ({ icon, label, onClick, disabled }) => (
  <button aria-label={label} onClick={onClick} disabled={disabled} className={s.container}>
    <div className={s.stateLayer} />
    {icon}
  </button>
);

export default StandardIconButton;
