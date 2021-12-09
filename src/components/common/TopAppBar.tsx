import { Heading, HStack, Spacer, IconButton, Avatar } from "@chakra-ui/react";
import { MdHistory } from "react-icons/md";

import DrawerMenu from "components/common/DrawerMenu";
import UserMenu from "components/models/user/UserMenu";

type Props = {
  onMdToggle: () => void;
};

const TopAppBar = ({ onMdToggle }: Props) => (
  <HStack h="56px" px="16px" spacing="8px" bg="purple.500">
    <DrawerMenu onMdToggle={onMdToggle} />
    <Heading as="h2" fontSize="lg" color="white">
      tomeit
    </Heading>
    <Spacer />
    <IconButton
      fontSize="24px"
      aria-label="履歴ページを開く"
      colorScheme="purple"
      icon={<MdHistory />}
    />
    <UserMenu />
  </HStack>
);

export default TopAppBar;
