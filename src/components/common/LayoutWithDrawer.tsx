import { Flex, useDisclosure } from "@chakra-ui/react";

import TopAppBar from "components/common/TopAppBar";
import Drawer from "components/common/Drawer";

type ContainerProps = {
  children: JSX.Element;
};

type Props = ContainerProps & {
  isOpen: boolean;
  onToggle: () => void;
};

const LayoutWithDrawer = ({
  children,
  isOpen,
  onToggle,
}: Props): JSX.Element => (
  <>
    <TopAppBar onToggle={onToggle} />
    <Flex>
      <Drawer isOpen={isOpen} onToggle={onToggle} />
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
