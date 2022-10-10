import { FC, MouseEventHandler } from "react";

import StandardIconButton from "@/components/common/StandardIconButton";
import { AccountCircleIcon, LogoutIcon } from "@/components/icons";
import * as s from "./Account.css";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onLogoutButtonClick: MouseEventHandler<HTMLButtonElement>;
};

const Account: FC<Props> = ({
  isMenuOpen,
  toggleMenu,
  onLogoutButtonClick,
}) => (
  <div className={s.layout}>
    <StandardIconButton
      icon={<AccountCircleIcon />}
      label="アカウントメニューの切り替え"
      onClick={toggleMenu}
    />
    {isMenuOpen ? (
      <div className={s.container}>
        <button onClick={onLogoutButtonClick} className={s.listItem}>
          <div className={s.stateLayer} />
          <p className={s.leadingIcon}>
            <LogoutIcon />
          </p>
          <p className={s.labelText}>ログアウト</p>
        </button>
      </div>
    ) : (
      <></>
    )}
  </div>
);

export default Account;
