import React from "react";

import * as s from "./IconButton.css";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  icon: React.ReactNode;
  label: string;
};

export const IconButton: React.FC<Props> = ({ icon, label, onClick, type, disabled }) => (
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
