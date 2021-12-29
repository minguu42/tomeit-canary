import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/functional/Theme";
import Auth from "@/components/functional/Auth";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
