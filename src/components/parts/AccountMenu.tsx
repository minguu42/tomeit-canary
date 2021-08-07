import { useState } from "react";

import styles from "styles/components/parts/AccountMenu.module.scss";
import AccountCircleIcon from "components/parts/AccountCircleIcon";
import { logout } from "lib/AuthContext";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  handleAccountClick: () => void;
  handleLogout: () => Promise<void>;
};

const AccountMenu = ({
  isOpen,
  handleAccountClick,
  handleLogout,
}: Props): JSX.Element => (
  <div role="button" className={styles.wrapper}>
    <span role="button" onClick={handleAccountClick}>
      <AccountCircleIcon fill="#ffffff" />
    </span>
    {isOpen && (
      <menu className={styles.menu}>
        <li role="button" onClick={handleLogout} className={styles.menuItem}>
          ログアウト
        </li>
      </menu>
    )}
  </div>
);

const AccountMenuContainer = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAccountClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      await router.push("/");
    } catch {
      window.alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <AccountMenu
      isOpen={isOpen}
      handleAccountClick={handleAccountClick}
      handleLogout={handleLogout}
    />
  );
};

export default AccountMenuContainer;
