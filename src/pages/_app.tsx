import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { Layout } from "@/features/layouts/Layout";
import { Theme } from "@/features/theme/Theme";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
