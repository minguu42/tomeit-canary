import { VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "styles/components/Header.module.scss";

const Header: VFC = () => (
  <header className={styles.outer}>
    <div className={styles.inner}>
      <Link href="/">
        <a className={styles.leftWrapper}>
          <Image src="/logo512.png" alt="tomeit Logo" width={32} height={32} />
          <h2 className={styles.appName}>tomeit</h2>
        </a>
      </Link>
    </div>
  </header>
);

export default Header;
