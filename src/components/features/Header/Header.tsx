import { FC, useState } from "react";

import FilledButton from "@/components/common/FilledButton";
import StandardIconButton from "@/components/common/StandardIconButton";
import Account from "@/components/features/Header/Account";
import LoginDialog from "@/components/features/Header/LoginDialog";
import {
  DarkModeIcon,
  LightModeIcon,
  LoginIcon,
  MenuIcon,
  MenuOpenIcon,
} from "@/components/icons";
import * as s from "./Header.css";
import {
  useIsDarkTheme,
  useIsDarkThemeMutators,
} from "@/globalStates/isDarkTheme";
import {
  useIsNavigationDrawerOpenAtom,
  useIsNavigationDrawerOpenMutators,
} from "@/globalStates/isNavigationDrawerOpenAtom";
import { useUserAtom } from "@/globalStates/userAtom";
import { logout } from "@/lib/auth";

const Header: FC = () => {
  const [heading] = useState("Tomeit");
  const user = useUserAtom();
  const isNavigationDrawerOpen = useIsNavigationDrawerOpenAtom();
  const { toggleNavigationDrawer } = useIsNavigationDrawerOpenMutators();
  const isDarkTheme = useIsDarkTheme();
  const { toggleTheme } = useIsDarkThemeMutators();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const toggleLoginDialog = (): void => {
    setIsLoginDialogOpen((prev) => !prev);
  };

  const toggleAccountMenu = (): void => {
    setIsAccountMenuOpen((prev) => !prev);
  };

  if (user === null) {
    return (
      <header className={s.container}>
        <StandardIconButton
          icon={isNavigationDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          label="ドロワーの切り替え"
          onClick={toggleNavigationDrawer}
        />
        <h2 className={s.heading}>{heading}</h2>
        <div className={s.spacer} />
        <StandardIconButton
          icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          label="テーマの切り替え"
          onClick={toggleTheme}
        />
        <FilledButton
          icon={<LoginIcon />}
          labelText="ログイン"
          onClick={toggleLoginDialog}
        />
        <LoginDialog
          isOpen={isLoginDialogOpen}
          onScrimClick={toggleLoginDialog}
        />
      </header>
    );
  }

  return (
    <header className={s.container}>
      <StandardIconButton
        icon={isNavigationDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        label="ナビゲーションドロワーの切り替え"
        onClick={toggleNavigationDrawer}
      />
      <h2 className={s.heading}>{heading}</h2>
      <div className={s.spacer} />
      <StandardIconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="テーマの切り替え"
        onClick={toggleTheme}
      />
      <Account
        isMenuOpen={isAccountMenuOpen}
        toggleMenu={toggleAccountMenu}
        onLogoutButtonClick={() => void logout()}
      />
    </header>
  );
};

export default Header;
