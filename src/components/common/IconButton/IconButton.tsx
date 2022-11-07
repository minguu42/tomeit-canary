import { FC, MouseEventHandler } from "react";

import * as s from "./IconButton.css";

type Props = {
  icon: JSX.Element;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const IconButton: FC<Props> = ({ icon, label, onClick, disabled }) => (
  <button aria-label={label} onClick={onClick} disabled={disabled} className={s.container}>
    <div className={s.outline}>
      <div className={s.stateLayer} />
      {icon}
    </div>
  </button>
);

export default IconButton;
