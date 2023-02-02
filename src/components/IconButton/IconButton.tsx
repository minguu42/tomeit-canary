import type { MouseEventHandler, ReactNode } from "react";

import * as s from "./IconButton.css";

type Props = {
  icon: ReactNode;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};

export const IconButton = ({ icon, label, onClick, type, disabled }: Props): JSX.Element => (
  <button
    aria-label={label}
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={s.container}
  >
    <div className={s.outline}>
      <div className={s.stateLayer} />
      {icon}
    </div>
  </button>
);
