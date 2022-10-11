import { FC, useState } from "react";

import { LightModeIcon } from "@/components/icons";
import Indicator from "@/components/features/Drawer/Indicator";
import * as s from "./Drawer.css";
import {
  useIsDrawerOpenAtom,
  useIsDrawerOpenMutators,
} from "@/globalStates/isDrawerOpen";

export const Drawer: FC = () => {
  const isOpen = useIsDrawerOpenAtom();
  const { toggleDrawer } = useIsDrawerOpenMutators();
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
      <button className={s.scrim} onClick={toggleDrawer} />
    </>
  );
};

export default Drawer;
