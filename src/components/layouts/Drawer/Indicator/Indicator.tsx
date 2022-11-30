import { FC } from "react";
import Link from "next/link";

import * as s from "./Indicator.css";

type Props = {
  url: string;
  isActive: boolean;
  icon: JSX.Element;
  labelText: string;
  badgeLabelText?: string;
};

export const Indicator: FC<Props> = ({ url, isActive, icon, labelText, badgeLabelText }) => (
  <li>
    <Link href={url} className={isActive ? s.containerActive : s.container}>
      <div className={isActive ? s.stateLayerActive : s.stateLayer} />
      <div className={s.icon}>{icon}</div>
      <h3 className={s.labelText}>{labelText}</h3>
      <p className={s.badgeLabelText}>{badgeLabelText}</p>
    </Link>
  </li>
);
