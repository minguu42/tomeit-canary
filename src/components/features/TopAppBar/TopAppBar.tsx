import { FC, useState } from "react";

import FilledButton from "@/components/common/FilledButton";
import IconButton from "@/components/common/IconButton";
import {
  DarkModeIcon,
  LightModeIcon,
  LoginIcon,
  MenuIcon,
  MenuOpenIcon,
} from "@/components/icons";
import Account from "@/components/features/TopAppBar/Account";
import * as s from "./TopAppBar.css";
import { useIsLoginDialogOpenMutators } from "@/globalStates/isLoginDialogOpenAtom";
import {
  useIsNavigationDrawerOpenAtom,
  useIsNavigationDrawerOpenMutators,
} from "@/globalStates/isNavigationDrawerOpenAtom";
import { useUserAtom } from "@/globalStates/userAtom";
import { useTheme } from "@/hooks/useTheme";
import { logout } from "@/lib/auth";

// TopAppBarの仕様はM3のSmall top app barに従う
// https://m3.material.io/components/top-app-bar/specs
const TopAppBar: FC = () => {
  const [headline] = useState("Tomeit");
  const user = useUserAtom();
  const isNavigationDrawerOpen = useIsNavigationDrawerOpenAtom();
  const { toggleNavigationDrawer } = useIsNavigationDrawerOpenMutators();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { toggleLoginDialog } = useIsLoginDialogOpenMutators();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const toggleAccountMenu = (): void => {
    setIsAccountMenuOpen((prev) => !prev);
  };

  return (
    <header className={s.container}>
      <IconButton
        icon={isNavigationDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        label="ナビゲーションドロワーの切り替え"
        onClick={toggleNavigationDrawer}
      />
      <h2 className={s.headline}>{headline}</h2>
      <div className={s.spacer} />
      <IconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="テーマの切り替え"
        onClick={toggleTheme}
      />
      {user === null ? (
        <FilledButton
          icon={<LoginIcon />}
          labelText="ログイン"
          onClick={toggleLoginDialog}
        />
      ) : (
        <Account
          isMenuOpen={isAccountMenuOpen}
          toggleMenu={toggleAccountMenu}
          onLogoutButtonClick={() => void logout()}
        />
      )}
    </header>
  );
};

export default TopAppBar;
