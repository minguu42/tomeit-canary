import { FC, useState } from "react";

import Header from "@/components/layouts/Layout/Header";
import Drawer from "@/components/layouts/Layout/Drawer";
import SideSheet from "@/components/layouts/Layout/SideSheet";
import PomodoroPlayer from "@/components/layouts/Layout/PomodoroPlayer";
import * as s from "./Layout.css";

type Props = {
  children: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <div className={s.sideLayout}>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <div className={s.main}>{children}</div>
        <SideSheet />
      </div>
      <PomodoroPlayer />
    </div>
  );
};

export default Layout;
