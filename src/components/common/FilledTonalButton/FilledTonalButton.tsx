import { FC, MouseEventHandler } from "react";

import * as s from "./FilledTonalButton.css";

type Props = {
  labelText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const FilledTonalButton: FC<Props> = ({ labelText, onClick }) => (
  <button onClick={onClick} className={s.container}>
    <div className={s.stateLayer} />
    <p className={s.labelText}>{labelText}</p>
  </button>
);

export default FilledTonalButton;
