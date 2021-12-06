import { HStack, Spacer, IconButton, Heading } from "@chakra-ui/react";

import { MenuIcon, HistoryIcon, AccountCircleIcon } from "components/icons";

const TopAppBar = (): JSX.Element => (
  <HStack px={4} bg="purple.500" h={14} spacing={4}>
    <IconButton
      aria-label="ドロワーを切り替える"
      colorScheme="purple"
      icon={<MenuIcon />}
    />
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
);

export default TopAppBar;
