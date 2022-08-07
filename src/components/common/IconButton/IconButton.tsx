import { FC } from "react";

import s from "./IconButton.module.css";

type Props = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

// IconButtonはM3のStandard icon buttonに従う
// https://m3.material.io/components/icon-buttons/specs
const IconButton: FC<Props> = ({ icon, label, onClick, disabled }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={s.container}
    disabled={disabled}
  >
    <div className={s.stateLayer} />
    {icon}
  </button>
);

export default IconButton;
