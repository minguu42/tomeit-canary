import { NextPage } from "next";
import Head from "next/head";
import { Container, Flex, VStack, Text, Heading } from "@chakra-ui/react";

import LayoutWithDrawer from "components/common/LayoutWithDrawer";
import Image from "components/common/Image";

const Landing = (): JSX.Element => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
      />
    </Head>

    <LayoutWithDrawer>
      <Container maxW="container.lg" pt={{ base: "12px", md: "56px" }}>
        <Flex gridGap="24px" direction={{ base: "column", md: "row" }}>
          <VStack alignItems="flex-start" spacing="24px">
            <Heading mt="56px">やるべきことのみをやる</Heading>
            <Text>
              tomeit は必要なことだけに集中するためのタスク管理アプリです。
              <br />
              今やるべきことのみに集中し、淡々とタスクをこなしましょう！
            </Text>
          </VStack>
          <Image
            src="/work_from_home.png"
            width={400}
            height={300}
            alt=""
            w="auto"
            h="auto"
          />
        </Flex>
      </Container>
    </LayoutWithDrawer>
  </>
);

const LandingContainer: NextPage = () => {
  return <Landing />;
};

export default LandingContainer;
