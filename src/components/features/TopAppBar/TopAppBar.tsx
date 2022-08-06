import { FC } from "react";
import Image from "next/image";

import {
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
} from "@/components/common/icons";
import IconButton from "@/components/common/IconButton";
import s from "./TopAppBar.module.css";
import { useThemeActions } from "@/components/features/Theme";
import { useThemeAtom } from "@/globalStates/themeAtom";
import { logout } from "@/lib/auth";
import { imageLoader } from "@/lib/loader";

const TopAppBar: FC = () => {
  const theme = useThemeAtom();
  const { toggleTheme } = useThemeActions();
  return (
    <header className={s.container}>
      <Image
        src="icon.png"
        width={30}
        height={30}
        alt=""
        loader={imageLoader}
        unoptimized
      />
      <h2 className={s.headline}>Tomeit</h2>
      <div className={s.spacer} />
      <IconButton
        icon={theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        onClick={() => {
          toggleTheme(theme);
        }}
        label="カラーテーマを切り替える"
      />
      <IconButton
        icon={<LogoutIcon />}
        onClick={() => void logout()}
        label="ログアウトする"
      />
    </header>
  );
};

export default TopAppBar;
