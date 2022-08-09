import { FC } from "react";

import * as s from "./FilledButton.css";

type Props = {
  labelText: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const FilledButton: FC<Props> = ({ labelText, icon, disabled }) => (
  <button disabled={disabled} className={s.container}>
    <div className={s.stateLayer} />
    <div className={s.icon}>{icon}</div>
    <p className={s.labelText}>{labelText}</p>
  </button>
);

export default FilledButton;
