import type { VFC } from "react";

import {
  MenuIcon,
  LightModeIcon,
  DarkModeIcon,
  LogoutIcon,
} from "@/components/common/icons";
import s from "./TopAppBar.module.css";
import { useTheme } from "@/components/functional/Theme";

const TopAppBar: VFC = () => {
  const headline = "tomeit";
  const { theme, toggleTheme } = useTheme();
  const toggleNavigationDrawer = () => {
    window.alert("toggleNavigationDrawer");
  };
  const logout = () => {
    window.alert("ログアウト");
  };

  return (
    <header className={s.container}>
      <button onClick={toggleNavigationDrawer} className={s.navigationIcon}>
        <div className={s.navigationIconLayer} />
        <MenuIcon />
      </button>
      <h2 className={s.headline}>{headline}</h2>
      <div className={s.spacer} />
      <div className={s.trailingIcons}>
        <button onClick={toggleTheme} className={s.interactiveIcon}>
          <div className={s.interactiveIconLayer} />
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <button onClick={logout} className={s.interactiveIcon}>
          <div className={s.interactiveIconLayer} />
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default TopAppBar;
