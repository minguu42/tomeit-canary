import NextLink from "next/link";
import { Flex, Button, ButtonProps } from "@chakra-ui/react";

type CustomLinkProps = ButtonProps & {
  url: string;
};

const CustomLink = ({ url, ...props }: CustomLinkProps): JSX.Element => (
  <NextLink href={url} passHref>
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
    <CustomLink url="/tasks/today">Today</CustomLink>
    <CustomLink url="/tasks/tomorrow">Tomorrow</CustomLink>
    <CustomLink url="/tasks/someday">Someday</CustomLink>
  </Flex>
);

export default Navigation;
