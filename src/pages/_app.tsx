import { FC } from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import Auth from "@/components/features/Auth";
import Theme from "@/components/features/Theme";
import "@/styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Auth>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </Auth>
    </RecoilRoot>
  );
};

export default MyApp;
