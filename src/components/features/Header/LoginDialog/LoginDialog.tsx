import { FC, MouseEventHandler } from "react";

import GoogleLoginButton from "@/components/features/Header/LoginDialog/GoogleLoginButton";
import * as s from "./LoginDialog.css";
import { login } from "@/lib/auth";

type Props = {
  isOpen: boolean;
  onScrimClick: MouseEventHandler<HTMLButtonElement>;
};

const LoginDialog: FC<Props> = ({ isOpen, onScrimClick }) => {
  if (!isOpen) return <></>;

  return (
    <>
      <div className={s.container}>
        <h2 className={s.headline}>ログイン</h2>
        <p className={s.supportingText}>
          Tomeitは集中したい人のためのタスク管理アプリです。ログインしてデバイス間でデータを共有しましょう！
        </p>
        <div className={s.alignCenter}>
          <GoogleLoginButton login={() => void login()} />
        </div>
      </div>
      <button onClick={onScrimClick} className={s.scrim} />
    </>
  );
};

export default LoginDialog;
