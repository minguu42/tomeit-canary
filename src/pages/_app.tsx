import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import AuthProvider from "contexts/AuthContext";
import "styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
