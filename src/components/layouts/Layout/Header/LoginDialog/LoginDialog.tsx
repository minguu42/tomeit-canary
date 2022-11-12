import { FC, MouseEventHandler } from "react";

import { GoogleLoginButton } from "@/components/layouts/Layout/Header/LoginDialog/GoogleLoginButton";
import * as s from "./LoginDialog.css";
import { login } from "@/lib/auth";

type Props = {
  isOpen: boolean;
  onScrimClick: MouseEventHandler<HTMLButtonElement>;
};

export const LoginDialog: FC<Props> = ({ isOpen, onScrimClick }) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <button onClick={onScrimClick} className={s.scrim} />
      <div className={s.container}>
        <h2 className={s.headline}>ログイン</h2>
        <p className={s.supportingText}>
          Tomeitは集中したい人のためのタスク管理アプリです。ログインしてデバイス間でデータを共有しましょう！
        </p>
        <div className={s.alignCenter}>
          <GoogleLoginButton login={() => void login()} />
        </div>
      </div>
    </>
  );
};
