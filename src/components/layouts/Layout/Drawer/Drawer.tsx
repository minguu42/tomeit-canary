import { FC } from "react";
import { useRouter } from "next/router";

import { LightModeIcon } from "@/components/common/icons";
import Indicator from "@/components/layouts/Layout/Drawer/Indicator";
import * as s from "./Drawer.css";

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const Drawer: FC<Props> = ({ isOpen, toggleDrawer }) => {
  const router = useRouter();

  if (!isOpen) {
    return <></>;
  }

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
