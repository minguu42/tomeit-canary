import Image from "next/image";
import Link from "next/link";

import styles from "styles/components/modules/Header.module.scss";
import SummarizeIcon from "components/parts/SummarizeIcon";
import AccountMenu from "components/parts/AccountMenu";
import { useAuth } from "lib/AuthContext";

type Props = {
  isLoggedIn: boolean;
};

const Header = ({ isLoggedIn }: Props): JSX.Element => (
  <header className={styles.outer}>
    <div className={styles.inner}>
      <Link href="/">
        <a className={styles.leftWrapper}>
          <Image src="/logo512.png" alt="tomeit Logo" width={32} height={32} />
          <h2 className={styles.appName}>tomeit</h2>
        </a>
      </Link>
      {isLoggedIn && (
        <div className={styles.rightWrapper}>
          <SummarizeIcon fill="#ffffff" />
          <AccountMenu />
        </div>
      )}
    </div>
  </header>
);

const HeaderContainer = (): JSX.Element => {
  const { currentUser } = useAuth();

  return <Header isLoggedIn={currentUser !== null} />;
};

export default HeaderContainer;
