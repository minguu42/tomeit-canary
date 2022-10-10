import { FC, useState } from "react";

import StandardIconButton from "@/components/common/StandardIconButton";
import { AccountCircleIcon, LogoutIcon } from "@/components/icons";
import * as s from "./AccountMenu.css";
import { logout } from "@/lib/auth";

const AccountMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  if (isOpen) {
    return (
      <div className={s.layout}>
        <StandardIconButton
          icon={<AccountCircleIcon />}
          label="アカウントメニューの切り替え"
          onClick={toggleMenu}
        />
        <div className={s.container}>
          <button onClick={() => void logout()} className={s.listItem}>
            <div className={s.stateLayer} />
            <p className={s.leadingIcon}>
              <LogoutIcon />
            </p>
            <p className={s.labelText}>ログアウト</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <StandardIconButton
      icon={<AccountCircleIcon />}
      label="アカウントメニューの切り替え"
      onClick={toggleMenu}
    />
  );
};

export default AccountMenu;
