import { FC } from "react";

import { LightModeIcon } from "@/components/icons";
import * as s from "./NavigationDrawer.css";

type Props = {
  isOpen: boolean;
  activeIndicator: string;
  onScrimClick: () => void;
};

// NavigationDrawerはM3のNavigation drawerに従う
// https://m3.material.io/components/navigation-drawer/specs
// Headlineは省略する。
export const NavigationDrawer: FC<Props> = ({
  isOpen,
  activeIndicator,
  onScrimClick,
}) => {
  if (!isOpen) return <></>;
  return (
    <>
      <div className={s.container}>
        <div
          className={
            activeIndicator === "今日やること"
              ? s.indicator.active
              : s.indicator._
          }
        >
          <div className={s.stateLayer} />
          <LightModeIcon className={s.icon} />
          <h3 className={s.labelText}>今日やること</h3>
          <p className={s.badgeLabelText}>24</p>
        </div>
        <div
          className={
            activeIndicator === "タスク管理"
              ? s.indicator.active
              : s.indicator._
          }
        >
          <div className={s.stateLayer} />
          <LightModeIcon className={s.icon} />
          <h3 className={s.labelText}>タスク管理</h3>
          <p className={s.badgeLabelText}>100+</p>
        </div>
      </div>
      <button className={s.scrim} onClick={onScrimClick} />
    </>
  );
};

export default NavigationDrawer;
