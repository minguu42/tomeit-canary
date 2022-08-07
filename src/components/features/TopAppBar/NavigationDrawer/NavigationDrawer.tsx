import { FC } from "react";
import cn from "classnames";

import s from "./NavigationDrawer.module.css";
import { DarkModeIcon, LightModeIcon } from "@/components/icons";

type Props = {
  activeIndicator: string;
};

// NavigationDrawerはM3のNavigation drawerに従う
// https://m3.material.io/components/navigation-drawer/specs
// Headlineは省略する。
const NavigationDrawer: FC<Props> = ({ activeIndicator }) => (
  <div className={s.scrim}>
    <div className={s.container}>
      <div
        className={cn(s.indicator, {
          [s.activeIndicator]: activeIndicator === "今日やること",
        })}
      >
        <div className={s.stateLayer} />
        <LightModeIcon className={s.icon} />
        <div className={s.labelText}>今日やること</div>
        <p className={s.badgeLabelText}>24</p>
      </div>
      <div
        className={cn(s.indicator, {
          [s.activeIndicator]: activeIndicator === "タスク",
        })}
      >
        <div className={s.stateLayer} />
        <DarkModeIcon className={s.icon} />
        <p className={s.labelText}>タスク</p>
        <p className={s.badgeLabelText}>100+</p>
      </div>
    </div>
  </div>
);

export default NavigationDrawer;
