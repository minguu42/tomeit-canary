import {
  Box,
  Flex,
  HStack,
  Spacer,
  Heading,
  IconButton,
} from "@chakra-ui/react";

import { AccountCircleIcon, HistoryIcon } from "components/icons";
import DrawerMenu from "components/common/DrawerMenu";
import Navigation from "components/common/Navigation";

type Props = {
  children: JSX.Element;
};

const LayoutWithDrawer = ({ children }: Props): JSX.Element => (
  <>
    <HStack px={4} bg="purple.500" h={14} spacing={4}>
      <Box d={{ base: "block", md: "none" }}>
        <DrawerMenu />
      </Box>
      <Heading as="h2" fontSize="lg">
        tomeit
      </Heading>
      <Spacer />
      <IconButton
        aria-label="履歴ページを開く"
        colorScheme="purple"
        icon={<HistoryIcon />}
      />
      <IconButton
        aria-label="アカウントメニューを開く"
        colorScheme="purple"
        icon={<AccountCircleIcon />}
      />
    </HStack>
    <Flex>
      <Box d={{ base: "none", md: "block" }}>
        <Navigation />
      </Box>
      {children}
    </Flex>
  </>
);

export default LayoutWithDrawer;
