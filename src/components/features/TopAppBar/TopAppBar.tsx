import { FC, useState } from "react";

import IconButton from "@/components/common/IconButton";
import { useThemeActions } from "@/components/features/Theme";
import { DarkModeIcon, LightModeIcon, MenuIcon } from "@/components/icons";
import s from "./TopAppBar.module.css";
import { useThemeAtom } from "@/globalStates/themeAtom";
import NavigationDrawer from "@/components/features/TopAppBar/NavigationDrawer";

// TopAppBarの仕様はM3のSmall top app barに従う
// https://m3.material.io/components/top-app-bar/specs
const TopAppBar: FC = () => {
  const [headline] = useState("Tomeit");
  const theme = useThemeAtom();
  const { toggleTheme } = useThemeActions();

  return (
    <>
      <header className={s.container}>
        <IconButton
          icon={<MenuIcon />}
          label="ナビゲーションドロワーの切り替え"
          onClick={() => console.log("a")}
        />
        <h2 className={s.headline}>{headline}</h2>
        <div className={s.spacer} />
        <IconButton
          icon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          onClick={() => toggleTheme(theme)}
          label="カラーテーマを切り替え"
        />
      </header>
      <NavigationDrawer activeIndicator="今日やること" />
    </>
  );
};

export default TopAppBar;
