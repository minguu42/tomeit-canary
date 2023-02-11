import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { IconButton } from "@/components/IconButton";
import { DarkModeIcon, LightModeIcon, LoginIcon, LogoutIcon } from "@/components/icons";
import { useIsDarkTheme, useIsDarkThemeMutators } from "@/features/theme/useIsDarkTheme";
import * as s from "./Header.css";

export const Header: React.FC = () => {
  const { status } = useSession();
  const isDarkTheme = useIsDarkTheme();
  const { toggleTheme } = useIsDarkThemeMutators();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className={s.container}>
      <div className={s.spacer} />
      <IconButton
        icon={isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        label="UIテーマの切り替え"
        onClick={toggleTheme}
      />
      {status === "unauthenticated" ? (
        <IconButton icon={<LoginIcon />} label="ログイン" onClick={() => signIn()} />
      ) : (
        <IconButton icon={<LogoutIcon />} label="ログアウト" onClick={() => signOut()} />
      )}
    </header>
  );
};
