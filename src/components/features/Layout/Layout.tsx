import { FC, useState } from "react";

import TopAppBar from "@/components/features/Layout/TopAppBar";
import NavigationDrawer from "@/components/features/Layout/NavigationDrawer";
import * as s from "./Layout.css";
import { useTheme } from "@/hooks/useTheme";

const Layout: FC = () => {
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(false);
  const { toggleTheme } = useTheme();

  const toggleNavigationDrawer = () => {
    setIsNavigationDrawerOpen((prev) => !prev);
  };

  return (
    <div className={s.background}>
      <TopAppBar
        headline="Tomeit"
        isDarkTheme={false}
        onMenuIconClick={toggleNavigationDrawer}
        onThemeIconClick={toggleTheme}
      />
      <div className={s.sideLayout}>
        <NavigationDrawer
          isOpen={isNavigationDrawerOpen}
          activeIndicator="今日やること"
          onScrimClick={toggleNavigationDrawer}
        />
        <p className={s.sideLayout}>main</p>
      </div>
    </div>
  );
};

export default Layout;
