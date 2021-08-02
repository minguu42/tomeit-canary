import type { AppProps } from "next/app";

import "styles/global.scss";
import AuthProvider from "lib/AuthContext";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
