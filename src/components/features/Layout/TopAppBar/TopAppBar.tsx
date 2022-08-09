import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import { DarkModeIcon, LightModeIcon, MenuIcon } from "@/components/icons";
import * as s from "./TopAppBar.css";

type Props = {
  headline: string;
  isDarkTheme: boolean;
  onMenuIconClick: () => void;
  onThemeIconClick: () => void;
};

// TopAppBarの仕様はM3のSmall top app barに従う
// https://m3.material.io/components/top-app-bar/specs
const TopAppBar: FC<Props> = ({
  headline,
  isDarkTheme,
  onMenuIconClick,
  onThemeIconClick,
}) => (
  <header className={s.container}>
    <IconButton
      icon={<MenuIcon />}
      label="ナビゲーションドロワーの切り替え"
      onClick={onMenuIconClick}
    />
    <h2 className={s.headline}>{headline}</h2>
    <div className={s.spacer} />
    <IconButton
      icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      label="テーマの切り替え"
      onClick={onThemeIconClick}
    />
  </header>
);

export default TopAppBar;
