import {
  Box,
  Flex,
  HStack,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AccountCircleIcon, HistoryIcon, MenuIcon } from "components/icons";
import DrawerMenu from "components/common/DrawerMenu";
import Navigation from "components/common/Navigation";

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  onToggle: () => void;
};

type ContainerProps = {
  children: JSX.Element;
};

const LayoutWithDrawer = ({
  children,
  isOpen,
  onToggle,
}: Props): JSX.Element => (
  <>
    <HStack px={4} bg="purple.500" h={14} spacing={4}>
      <DrawerMenu onMdToggle={onToggle} />
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
      <Box
        d={{ base: "none", md: "block" }}
        minH="100vh"
        borderRight="1px"
        borderColor="gray.200"
      >
        {isOpen ? <Navigation /> : <></>}
      </Box>
      {children}
    </Flex>
  </>
);

const LayoutWithDrawerContainer = ({
  children,
}: ContainerProps): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <LayoutWithDrawer isOpen={isOpen} onToggle={onToggle}>
      {children}
    </LayoutWithDrawer>
  );
};

export default LayoutWithDrawerContainer;
