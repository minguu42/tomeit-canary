import { IconButton } from "@/components/IconButton";
import { DarkModeIcon, LightModeIcon, LogoutIcon } from "@/components/icons";
import { useIsDarkTheme, useIsDarkThemeMutators } from "@/features/theme/useIsDarkTheme";

import * as s from "./Header.css";

export const Header = (): JSX.Element => {
  const isDarkTheme = useIsDarkTheme();
  const { toggleTheme } = useIsDarkThemeMutators();
  return (
    <header className={s.container}>
      <div className={s.spacer} />
      <IconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="UIテーマの切り替え"
        onClick={toggleTheme}
      />
      <IconButton
        icon={<LogoutIcon />}
        label="ログアウト"
        onClick={() => window.alert("ログアウト")}
      />
    </header>
  );
};
