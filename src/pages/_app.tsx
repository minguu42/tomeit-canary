import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "@/styles/globals.css";
import Auth from "components/functional/Auth";

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
