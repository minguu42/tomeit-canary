import { FC } from "react";
import { useRouter } from "next/router";

import { LightModeIcon } from "@/components/icons";
import Indicator from "@/components/features/Drawer/Indicator";
import * as s from "./Drawer.css";
import { useIsDrawerOpenAtom, useIsDrawerOpenMutators } from "@/globalStates/isDrawerOpen";

export const Drawer: FC = () => {
  const isOpen = useIsDrawerOpenAtom();
  const { toggleDrawer } = useIsDrawerOpenMutators();
  const router = useRouter();

  if (!isOpen) return <></>;

  return (
    <>
      <ul className={s.container}>
        <Indicator
          url="/focus"
          isActive={router.pathname === "/focus"}
          icon={<LightModeIcon />}
          labelText="今日やること"
          badgeLabelText="24"
        />
        <Indicator
          url="/"
          isActive={router.pathname === "/"}
          icon={<LightModeIcon />}
          labelText="タスク管理"
          badgeLabelText="100+"
        />
      </ul>
      <button className={s.scrim} onClick={toggleDrawer} />
    </>
  );
};

export default Drawer;
