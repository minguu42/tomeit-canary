import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "styles/global.scss";
import Auth from "components/common/Auth";

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
