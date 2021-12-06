import { NextPage } from "next";
import Head from "next/head";
import { Container, Flex, VStack, Text, Heading } from "@chakra-ui/react";

import TopAppBar from "components/common/TopAppBar";

const Landing = (): JSX.Element => (
  <>
    <Head>
      <title>tomeit</title>
      <meta
        name="description"
        content="tomeit は必要なことだけに集中するためのタスク管理アプリです。ポモドーロテクニックを使って、今やるべきことのみに集中し, 淡々とタスクをこなしましょう！"
      />
    </Head>

    <TopAppBar />
    <Container maxW="container.xl">
      <Flex>
        <VStack alignItems="flex-start">
          <Heading>やるべきことのみをやる</Heading>
          <Text>
            tomeit は必要なことだけに集中するためのタスク管理アプリです。
            <br />
            今やるべきことのみに集中し、淡々とタスクをこなしましょう！
          </Text>
        </VStack>
        <h2>Be fun!</h2>
      </Flex>
    </Container>
  </>
);

const LandingContainer: NextPage = () => {
  return <Landing />;
};

export default LandingContainer;
