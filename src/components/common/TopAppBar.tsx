import { Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";

import DrawerMenu from "components/common/DrawerMenu";
import { AccountCircleIcon, HistoryIcon } from "components/common/icons";

type Props = {
  onMdToggle: () => void;
};

const TopAppBar = ({ onMdToggle }: Props) => (
  <HStack h="56px" px="16px" spacing="16px" bg="purple.500">
    <DrawerMenu onMdToggle={onMdToggle} />
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
