import { FC } from "react";

import * as s from "./Indicator.css";
import Link from "next/link";

type Props = {
  url: string;
  isActive: boolean;
  icon: JSX.Element;
  labelText: string;
  badgeLabelText?: string;
};

const Indicator: FC<Props> = ({
  url,
  isActive,
  icon,
  labelText,
  badgeLabelText,
}) => (
  <li>
    <Link href={url}>
      <a className={isActive ? s.indicator.active : s.indicator._}>
        <div className={isActive ? s.stateLayer.active : s.stateLayer._} />
        <div className={s.icon}>{icon}</div>
        <h3 className={s.labelText}>{labelText}</h3>
        <p className={s.badgeLabelText}>{badgeLabelText}</p>
      </a>
    </Link>
  </li>
);

export default Indicator;
