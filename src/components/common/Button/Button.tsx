import { FC, MouseEventHandler } from "react";

import * as s from "./Button.css";

type Props = {
  variant: "filled" | "tonal";
  labelText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};

export const Button: FC<Props> = ({ variant, labelText, onClick, type, disabled }) => {
  let container;
  let stateLayer;
  if (variant === "filled") {
    container = s.containerFilled;
    stateLayer = s.stateLayerFilled;
  } else if (variant === "tonal") {
    container = s.containerTonal;
    stateLayer = s.stateLayerTonal;
  }
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={container}>
      <div className={stateLayer} />
      {labelText}
    </button>
  );
};
