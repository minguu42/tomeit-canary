import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";

import Navigation from "../Navigation";

type ContainerProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export type MobileProps = ContainerProps;

export const MobileDrawer = ({
  isOpen,
  onToggle,
}: MobileProps): JSX.Element => (
  <Drawer isOpen={isOpen} placement="left" onClose={onToggle}>
    <DrawerOverlay d={{ base: "block", md: "none" }}>
      <DrawerContent maxW="256px">
        <DrawerCloseButton />
        <DrawerHeader>ヘッダ</DrawerHeader>
        <DrawerBody>
          <Navigation />
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

export const DesktopDrawer = (): JSX.Element => (
  <Box minH="100vh" borderRight="1px" borderColor="gray.200">
    <Navigation />
  </Box>
);

const DrawerContainer = ({ isOpen, onToggle }: ContainerProps): JSX.Element => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    return <MobileDrawer isOpen={isOpen} onToggle={onToggle} />;
  }
  return isOpen ? <DesktopDrawer /> : <></>;
};

export default DrawerContainer;
