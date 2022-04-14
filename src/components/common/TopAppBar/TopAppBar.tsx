import { useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import {
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
  MenuIcon,
} from "@/components/common/icons";
import { useThemeActions } from "@/components/functional/Theme";
import s from "./TopAppBar.module.css";
import { useUserAtom } from "@/globalStates/userAtom";
import { useThemeAtom } from "@/globalStates/themeAtom";
import { useIsNavigationDrawerOpenMutators } from "@/globalStates/isNavigationDrawerOpenAtom";
import { logout } from "@/lib/auth";

const TopAppBar: VFC = () => {
  const [headline, setHeadline] = useState("tomeit");
  const router = useRouter();
  const user = useUserAtom();
  const theme = useThemeAtom();
  const { toggleTheme } = useThemeActions();
  const { toggleNavigationDrawer } = useIsNavigationDrawerOpenMutators();

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setHeadline("tomeit");
        break;
      case "/tasks/today":
        setHeadline("今日");
        break;
      case "/tasks/tomorrow":
        setHeadline("明日");
        break;
      case "/tasks/someday":
        setHeadline("いつか");
        break;
    }
  }, [router.pathname]);

  if (user === null) {
    return (
      <header className={s.container}>
        <h2 className={cn(s.headline, s.ml12)}>{headline}</h2>
        <div className={s.spacer} />
        <button
          onClick={() => {
            toggleTheme(theme);
          }}
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
          onClick={() => {
            toggleTheme(theme);
          }}
          aria-label="カラーテーマを切り替える"
          className={s.interactiveIcon}
        >
          <div className={s.interactiveIconLayer} />
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <button
          onClick={() => {
            void logout();
          }}
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
