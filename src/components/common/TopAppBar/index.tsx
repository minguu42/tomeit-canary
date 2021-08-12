import Image from "next/image";
import Link from "next/link";

import SummarizeIcon from "components/common/icons/SummarizeIcon";
import AccountMenu from "components/common/TopAppBar/AccountMenu";
import styles from "components/common/TopAppBar/TopAppBar.module.scss";
import { useAuth } from "lib/AuthContext";

type Props = {
  isLoggedIn: boolean;
};

const TopAppBar = ({ isLoggedIn }: Props): JSX.Element => (
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
          <Link href="/stack">
            <a>
              <SummarizeIcon fill="#ffffff" />
            </a>
          </Link>
          <AccountMenu />
        </div>
      )}
    </div>
  </header>
);

const TopAppBarContainer = (): JSX.Element => {
  const { currentUser } = useAuth();

  return <TopAppBar isLoggedIn={currentUser !== null} />;
};

export default TopAppBarContainer;
