import { FC } from "react";
import Image from "next/image";

import * as s from "./GoogleLoginButton.css";

type Props = {
  login: () => void;
};

export const GoogleLoginButton: FC<Props> = ({ login }) => (
  <button onClick={login} className={s.container}>
    <div className={s.stateLayer} />
    <div className={s.logoBackground}>
      <Image
        src="/images/google.png"
        alt=""
        width={18}
        height={18}
      />
    </div>
    Sign in with Google
  </button>
);
