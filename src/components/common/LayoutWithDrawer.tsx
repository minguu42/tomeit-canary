import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import TopAppBar from "components/common/TopAppBar";
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
    <TopAppBar onMdToggle={onToggle} />
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
