import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { Theme } from "@/features/theme/Theme";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </RecoilRoot>
  );
};

export default MyApp;
