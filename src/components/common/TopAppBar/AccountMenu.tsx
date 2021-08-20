import { useState } from "react";

import AccountCircleIcon from "components/common/icons/AccountCircleIcon";
import styles from "components/common/TopAppBar/AccountMenu.module.scss";

type Props = {
  isOpen: boolean;
  handleAccountClick: () => void;
  handleLogout: () => Promise<void>;
};

type ContainerProps = {
  handleLogout: () => Promise<void>;
};

const AccountMenu = ({
  isOpen,
  handleAccountClick,
  handleLogout,
}: Props): JSX.Element => (
  <div className={styles.container}>
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

const AccountMenuContainer = ({
  handleLogout,
}: ContainerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccountClick = () => {
    setIsOpen((isOpen) => !isOpen);
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
