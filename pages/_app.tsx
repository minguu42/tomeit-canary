import type { AppProps } from "next/app";

import "styles/global.scss";
import AuthProvider from "lib/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
