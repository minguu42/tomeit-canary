import NextLink from "next/link";
import { Flex, Button, ButtonProps } from "@chakra-ui/react";

const CustomLink = (props: ButtonProps): JSX.Element => (
  <NextLink href="/" passHref>
    <Button
      as="a"
      h="56px"
      p="16px"
      borderRadius="28px"
      justifyContent="flex-start"
      colorScheme="purple"
      variant="ghost"
      {...props}
    />
  </NextLink>
);

const Navigation = (): JSX.Element => (
  <Flex as="nav" w="224px" p="16px" direction="column">
    <CustomLink>Today</CustomLink>
    <CustomLink>Tomorrow</CustomLink>
    <CustomLink>Someday</CustomLink>
  </Flex>
);

export default Navigation;
