import {
  MenuIcon,
  LightModeIcon,
  DarkModeIcon,
  AccountCircleIcon,
} from "@/components/common/icons";
import s from "./TopAppBar.module.css";
import { Theme, useTheme } from "@/components/functional/Theme";

type Props = {
  theme: Theme;
  toggleDrawer: () => void;
  toggleTheme: () => void;
  handleAccountClick: () => void;
};

export const TopAppBar = ({
  theme,
  toggleDrawer,
  toggleTheme,
  handleAccountClick,
}: Props): JSX.Element => (
  <header className={s.container}>
    <button className={s.iconButton} onClick={toggleDrawer}>
      <div className={s.iconButtonLayer}>
        <MenuIcon />
      </div>
    </button>
    <h2 className={s.headline}>tomeit</h2>
    <button className={s.iconButton} onClick={toggleTheme}>
      <div className={s.iconButtonLayer}>
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </div>
    </button>
    <button className={s.iconButton} onClick={handleAccountClick}>
      <div className={s.iconButtonLayer}>
        <AccountCircleIcon size={32} />
      </div>
    </button>
  </header>
);

const TopAppBarContainer = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return (
    <TopAppBar
      theme={theme}
      toggleDrawer={() => {
        window.alert("メニュークリック");
      }}
      toggleTheme={toggleTheme}
      handleAccountClick={() => {
        window.alert("アカウントボタンクリックテスト");
      }}
    />
  );
};

export default TopAppBarContainer;
