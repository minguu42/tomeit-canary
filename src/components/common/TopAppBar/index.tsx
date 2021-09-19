import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import SummarizeIcon from "components/common/icons/SummarizeIcon";
import AccountMenu from "components/common/TopAppBar/AccountMenu";
import styles from "./styles.module.scss";
import { logout, useAuth } from "contexts/AuthContext";

type Props = {
  isLoggedIn: boolean;
  handleLogout: () => Promise<void>;
};

const TopAppBar = ({ isLoggedIn, handleLogout }: Props): JSX.Element => (
  <header className={styles.outer}>
    <div className={styles.inner}>
      {isLoggedIn && (
        <Link href="/home">
          <a className={styles.leftWrapper}>
            <Image
              src="/logo512.png"
              alt="tomeit Logo"
              width={32}
              height={32}
            />
            <h2 className={styles.appName}>tomeit</h2>
          </a>
        </Link>
      )}
      {!isLoggedIn && (
        <Link href="/">
          <a className={styles.leftWrapper}>
            <Image
              src="/logo512.png"
              alt="tomeit Logo"
              width={32}
              height={32}
            />
            <h2 className={styles.appName}>tomeit</h2>
          </a>
        </Link>
      )}
      {isLoggedIn && (
        <div className={styles.rightWrapper}>
          <Link href="/reports">
            <a>
              <SummarizeIcon fill="#ffffff" />
            </a>
          </Link>
          <AccountMenu handleLogout={handleLogout} />
        </div>
      )}
    </div>
  </header>
);

const TopAppBarContainer = (): JSX.Element => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      await router.push("/");
    } catch {
      window.alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <TopAppBar isLoggedIn={currentUser !== null} handleLogout={handleLogout} />
  );
};

export default TopAppBarContainer;
