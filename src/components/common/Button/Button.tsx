import { FC, MouseEventHandler } from "react";

import * as s from "./Button.css";

type Props = {
  type: "filled" | "tonal";
  labelText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: FC<Props> = ({ type, labelText, onClick, disabled }) => {
  let container;
  let stateLayer;
  if (type === "filled") {
    container = s.containerFilled;
    stateLayer = s.stateLayerFilled;
  } else if (type === "tonal") {
    container = s.containerTonal;
    stateLayer = s.stateLayerTonal;
  }
  return (
    <button onClick={onClick} disabled={disabled} className={container}>
      <div className={stateLayer} />
      {labelText}
    </button>
  );
};

export default Button;
