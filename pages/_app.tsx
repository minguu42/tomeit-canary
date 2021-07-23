import type { AppProps } from "next/app";

import "styles/global.scss";
import AuthProvider from "lib/AuthContext";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
    </AuthProvider>
  );
}

export default MyApp;
