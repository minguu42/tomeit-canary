import { FC } from "react";
import cn from "classnames";

import s from "./IconButton.module.css";

type Props = {
  icon: JSX.Element;
  onClick: () => void;
  label: string;
  type?: "variant";
};

const IconButton: FC<Props> = ({ icon, label, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(s.container, { [s.containerVariant]: type === "variant" })}
    >
      <div className={cn(s.layer, { [s.layerVariant]: type === "variant" })} />
      {icon}
    </button>
  );
};

export default IconButton;
