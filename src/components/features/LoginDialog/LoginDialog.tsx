import { FC } from "react";

import GoogleLoginButton from "@/components/features/LoginDialog/GoogleLoginButton";
import * as s from "./LoginDialog.css";
import {
  useIsLoginDialogOpenAtom,
  useIsLoginDialogOpenMutators,
} from "@/globalStates/isLoginDialogOpenAtom";

const LoginDialog: FC = () => {
  const isOpen = useIsLoginDialogOpenAtom();
  const { toggleLoginDialog } = useIsLoginDialogOpenMutators();

  if (!isOpen) return <></>;

  return (
    <>
      <div className={s.container}>
        <h2 className={s.headline}>ログイン</h2>
        <p className={s.supportingText}>
          Tomeitは集中したい人のためのタスク管理アプリです。ログインしてデバイス間でデータを共有しましょう！
        </p>
        <div className={s.alignCenter}>
          <GoogleLoginButton login={() => window.alert("Googleでログイン")} />
        </div>
      </div>
      <button onClick={toggleLoginDialog} className={s.scrim} />
    </>
  );
};

export default LoginDialog;
