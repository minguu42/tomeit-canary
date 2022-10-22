import { FC } from "react";
import Image from "next/image";

import * as s from "./GoogleLoginButton.css";
import { imageLoader } from "@/lib/loader";

type Props = {
  login: () => void;
};

const GoogleLoginButton: FC<Props> = ({ login }) => (
  <button onClick={login} className={s.container}>
    <div className={s.stateLayer} />
    <div className={s.logoBackground}>
      <Image
        src="/images/google.png"
        width={18}
        height={18}
        layout="fixed"
        alt=""
        loader={imageLoader}
        unoptimized={true}
      />
    </div>
    Sign in with Google
  </button>
);

export default GoogleLoginButton;
