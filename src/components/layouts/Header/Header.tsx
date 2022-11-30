import { FC, useState } from "react";

import { Button } from "@/components/common/Button";
import { IconButton } from "@/components/common/IconButton";
import { LoginDialog } from "@/components/layouts/Header/LoginDialog";
import {
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
  MenuIcon,
  MenuOpenIcon,
} from "@/components/common/icons";
import * as s from "./Header.css";
import { logout } from "@/lib/auth";
import { useIsDarkTheme, useIsDarkThemeMutators } from "@/stores/isDarkTheme";
import { useUser } from "@/stores/user";

type Props = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

export const Header: FC<Props> = ({ isDrawerOpen, toggleDrawer }) => {
  const [heading] = useState("Tomeit");
  const user = useUser();
  const isDarkTheme = useIsDarkTheme();
  const { toggleTheme } = useIsDarkThemeMutators();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const toggleLoginDialog = (): void => {
    setIsLoginDialogOpen((prev) => !prev);
  };

  if (user === null) {
    return (
      <header className={s.container}>
        <IconButton
          icon={isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          label="ドロワーの切り替え"
          onClick={toggleDrawer}
        />
        <h2 className={s.heading}>{heading}</h2>
        <div className={s.spacer} />
        <IconButton
          icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          label="テーマの切り替え"
          onClick={toggleTheme}
        />
        <Button variant="filled" labelText="ログイン" onClick={toggleLoginDialog} />
        <div className={s.space4} />
        <LoginDialog isOpen={isLoginDialogOpen} onScrimClick={toggleLoginDialog} />
      </header>
    );
  }

  return (
    <header className={s.container}>
      <IconButton
        icon={isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        label="ナビゲーションドロワーの切り替え"
        onClick={toggleDrawer}
      />
      <h2 className={s.heading}>{heading}</h2>
      <div className={s.spacer} />
      <IconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="テーマの切り替え"
        onClick={toggleTheme}
      />
      <IconButton icon={<LogoutIcon />} label="ログアウト" onClick={() => void logout()} />
    </header>
  );
};
