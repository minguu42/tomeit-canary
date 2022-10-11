import { FC } from "react";

import * as s from "./Indicator.css";

type Props = {
  isActive: boolean;
  icon: JSX.Element;
  labelText: string;
  badgeLabelText?: string;
};

const Indicator: FC<Props> = ({
  isActive,
  icon,
  labelText,
  badgeLabelText,
}) => (
  <div className={isActive ? s.indicator.active : s.indicator._}>
    <div className={s.stateLayer} />
    <div className={s.icon}>{icon}</div>
    <h3 className={s.labelText}>{labelText}</h3>
    <p className={s.badgeLabelText}>{badgeLabelText}</p>
  </div>
);

export default Indicator;
