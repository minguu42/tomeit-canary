import { VFC } from "react";
import Image from "next/image";

import s from "./GoogleLoginButton.module.css";
import { login } from "@/lib/auth";

export const GoogleLoginButton: VFC = () => {
  return (
    <button onClick={login} className={s.container}>
      <div className={s.layer} />
      <div className={s.logoBackground}>
        <Image
          src="/images/google.png"
          width={18}
          height={18}
          layout="fixed"
          alt="Google ロゴ"
        />
      </div>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
