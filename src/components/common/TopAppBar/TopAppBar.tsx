import type { VFC } from "react";
import cn from "classnames";

import {
  MenuIcon,
  LightModeIcon,
  DarkModeIcon,
  LogoutIcon,
} from "@/components/common/icons";
import s from "./TopAppBar.module.css";
import { logout, useUser } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { useToggleNavigationDrawer } from "@/lib/states";

const TopAppBar: VFC = () => {
  const headline = "tomeit";
  const user = useUser();
  const { theme, toggleTheme } = useTheme();
  const toggleNavigationDrawer = useToggleNavigationDrawer();

  if (user === null) {
    return (
      <header className={s.container}>
        <h2 className={cn(s.headline, s.ml12)}>{headline}</h2>
        <div className={s.spacer} />
        <button
          onClick={toggleTheme}
          aria-label="カラーテーマを切り替える"
          className={s.interactiveIcon}
        >
          <div className={s.interactiveIconLayer} />
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </header>
    );
  }

  return (
    <header className={s.container}>
      <button
        onClick={toggleNavigationDrawer}
        aria-label="ナビゲーションを開く"
        className={s.navigationIcon}
      >
        <div className={s.navigationIconLayer} />
        <MenuIcon />
      </button>
      <h2 className={s.headline}>{headline}</h2>
      <div className={s.spacer} />
      <div className={s.trailingIcons}>
        <button
          onClick={toggleTheme}
          aria-label="カラーテーマを切り替える"
          className={s.interactiveIcon}
        >
          <div className={s.interactiveIconLayer} />
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <button
          onClick={logout}
          aria-label="ログアウトする"
          className={s.interactiveIcon}
        >
          <div className={s.interactiveIconLayer} />
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default TopAppBar;
