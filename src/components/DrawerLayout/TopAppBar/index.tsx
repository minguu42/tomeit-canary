import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import MenuIcon from "components/icons/MenuIcon";
import SummarizeIcon from "components/icons/SummarizeIcon";
import AccountMenu from "components/DrawerLayout/TopAppBar/AccountMenu";
import s from "./styles.module.scss";
import { logout, useUser } from "lib/auth";
import { useIsDrawerOpenActions } from "lib/states";

type Props = {
  isLoggedIn: boolean;
  toggleDrawer: () => void;
  handleLogout: () => Promise<void>;
};

const TopAppBar = ({
  isLoggedIn,
  toggleDrawer,
  handleLogout,
}: Props): JSX.Element => (
  <header className={s.container}>
    <div className={s.leftWrapper}>
      {isLoggedIn && (
        <button onClick={toggleDrawer}>
          <MenuIcon fill="#ffffff" />
        </button>
      )}
      <Link href={isLoggedIn ? "/tasks/today" : "/"}>
        <a className={s.brand}>
          <Image src="/logo512.png" alt="tomeit logo" width={32} height={32} />
          <h2 className={s.appName}>tomeit</h2>
        </a>
      </Link>
    </div>
    {isLoggedIn && (
      <div className={s.rightWrapper}>
        <Link href="/reports">
          <a>
            <SummarizeIcon fill="#ffffff" />
          </a>
        </Link>
        <AccountMenu handleLogout={handleLogout} />
      </div>
    )}
  </header>
);

const TopAppBarContainer = (): JSX.Element => {
  const user = useUser();
  const router = useRouter();
  const { closeDrawer, toggleDrawer } = useIsDrawerOpenActions();

  const handleLogout = async (): Promise<void> => {
    try {
      closeDrawer();
      await logout();
      await router.push("/");
    } catch {
      window.alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <TopAppBar
      isLoggedIn={user !== null}
      toggleDrawer={toggleDrawer}
      handleLogout={handleLogout}
    />
  );
};

export default TopAppBarContainer;
