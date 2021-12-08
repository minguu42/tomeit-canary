import type { NextPage } from "next";
import Head from "next/head"
import { Container } from "@chakra-ui/react"

import LayoutWithDrawer from "components/common/LayoutWithDrawer";

const Today = (): JSX.Element => (
    <>
      <Head>
        <title>Today - tomeit</title>
      </Head>

      <LayoutWithDrawer>
        <Container maxW="container.lg">
          ここに色々入る
        </Container>
      </LayoutWithDrawer>
    </>
);

const TodayContainer: NextPage = () => {
  return <Today />;
};

export default TodayContainer;
