import { FC } from "react";
import Image from "next/image";

import s from "./GoogleLoginButton.module.css";
import { imageLoader } from "@/lib/loader";

type Props = {
  login: () => void;
};

const GoogleLoginButton: FC<Props> = ({ login }) => (
  <button onClick={login} className={s.container}>
    <div className={s.layer} />
    <div className={s.logoBackground}>
      <Image
        src="/images/google.png"
        width={18}
        height={18}
        layout="fixed"
        alt=""
        loader={imageLoader}
        unoptimized
      />
    </div>
    Sign in with Google
  </button>
);

export default GoogleLoginButton;
