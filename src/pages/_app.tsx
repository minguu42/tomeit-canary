import { FC } from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { Auth } from "@/components/features/Auth";
import { Theme } from "@/components/features/Theme";
import { Layout } from "@/components/layouts/Layout";
import "@/styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Auth>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </Auth>
    </RecoilRoot>
  );
};

export default MyApp;
