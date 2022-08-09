import { FC, useState } from "react";

import IconButton from "@/components/common/IconButton";
import {
  DarkModeIcon,
  LightModeIcon,
  MenuIcon,
  MenuOpenIcon,
} from "@/components/icons";
import * as s from "./TopAppBar.css";
import { useTheme } from "@/hooks/useTheme";
import {
  useIsNavigationDrawerOpenAtom,
  useIsNavigationDrawerOpenMutators,
} from "@/globalStates/isNavigationDrawerOpenAtom";

// TopAppBarの仕様はM3のSmall top app barに従う
// https://m3.material.io/components/top-app-bar/specs
const TopAppBar: FC = () => {
  const [headline] = useState("Tomeit");
  const isNavigationDrawerOpen = useIsNavigationDrawerOpenAtom();
  const { toggleNavigationDrawer } = useIsNavigationDrawerOpenMutators();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <header className={s.container}>
      <IconButton
        icon={isNavigationDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        label="ナビゲーションドロワーの切り替え"
        onClick={toggleNavigationDrawer}
      />
      <h2 className={s.headline}>{headline}</h2>
      <div className={s.spacer} />
      <IconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="テーマの切り替え"
        onClick={toggleTheme}
      />
    </header>
  );
};

export default TopAppBar;
