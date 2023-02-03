import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { Layout } from "@/features/layouts/Layout";
import { Theme } from "@/features/theme/Theme";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </RecoilRoot>
  );
};

export default MyApp;
