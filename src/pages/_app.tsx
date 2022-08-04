import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import Theme from "@/components/features/Theme";
import Auth from "@/components/features/Auth";
import Layout from "@/components/common/Layout";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Theme>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </Theme>
    </RecoilRoot>
  );
}

export default MyApp;
