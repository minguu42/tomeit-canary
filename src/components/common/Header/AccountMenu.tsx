import { useState } from "react";
import { useRouter } from "next/router";

import AccountCircleIcon from "components/common/icons/AccountCircleIcon";
import styles from "components/common/Header/AccountMenu.module.scss";
import { logout } from "lib/AuthContext";

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
