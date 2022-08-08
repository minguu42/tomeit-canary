import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import Auth from "@/components/features/Auth";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  );
}

export default MyApp;
