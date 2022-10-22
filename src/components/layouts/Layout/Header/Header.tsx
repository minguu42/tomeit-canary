import { FC, useState } from "react";

import FilledButton from "@/components/common/FilledButton";
import IconButton from "@/components/common/IconButton";
import AccountMenu from "@/components/layouts/Layout/Header/AccountMenu";
import LoginDialog from "@/components/layouts/Layout/Header/LoginDialog";
import {
  DarkModeIcon,
  LightModeIcon,
  LoginIcon,
  MenuIcon,
  MenuOpenIcon,
} from "@/components/common/icons";
import * as s from "./Header.css";
import { useIsDarkTheme, useIsDarkThemeMutators } from "@/globalStates/isDarkTheme";
import { useUser } from "@/globalStates/user";

type Props = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const Header: FC<Props> = ({ isDrawerOpen, toggleDrawer }) => {
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
        <FilledButton icon={<LoginIcon />} labelText="ログイン" onClick={toggleLoginDialog} />
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
      <AccountMenu />
    </header>
  );
};

export default Header;
