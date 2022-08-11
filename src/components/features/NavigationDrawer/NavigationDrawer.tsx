import { FC, useState } from "react";

import { LightModeIcon } from "@/components/icons";
import Indicator from "@/components/features/NavigationDrawer/Indicator";
import * as s from "./NavigationDrawer.css";
import {
  useIsNavigationDrawerOpenAtom,
  useIsNavigationDrawerOpenMutators,
} from "@/globalStates/isNavigationDrawerOpenAtom";

// NavigationDrawerはM3のNavigation drawerに従う
// https://m3.material.io/components/navigation-drawer/specs
// Headlineは省略する。
export const NavigationDrawer: FC = () => {
  const isOpen = useIsNavigationDrawerOpenAtom();
  const { toggleNavigationDrawer } = useIsNavigationDrawerOpenMutators();
  const [activeIndicator] = useState("今日やること");

  if (!isOpen) return <></>;

  return (
    <>
      <div className={s.container}>
        <Indicator
          isActive={activeIndicator === "今日やること"}
          icon={<LightModeIcon />}
          labelText="今日やること"
          badgeLabelText="24"
        />
        <Indicator
          isActive={activeIndicator === "タスク管理"}
          icon={<LightModeIcon />}
          labelText="タスク管理"
          badgeLabelText="100+"
        />
      </div>
      <button className={s.scrim} onClick={toggleNavigationDrawer} />
    </>
  );
};

export default NavigationDrawer;
