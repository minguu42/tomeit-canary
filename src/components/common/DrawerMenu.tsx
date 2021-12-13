import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import Navigation from "./Navigation";
import { MenuIcon } from "components/common/icons";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onMdToggle: () => void;
};

type ContainerProps = {
  onMdToggle: () => void;
};

const DrawerMenu = ({
  isOpen,
  onOpen,
  onClose,
  onMdToggle,
}: Props): JSX.Element => (
  <>
    <Box d={{ base: "block", md: "none" }}>
      <IconButton
        aria-label="ドロワーを切り替える"
        icon={<MenuIcon w="24px" h="24px" />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent maxW="256px">
            <DrawerCloseButton />
            <DrawerHeader>ヘッダ</DrawerHeader>
            <DrawerBody>
              <Navigation />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
    <Box d={{ base: "none", md: "block" }}>
      <IconButton
        aria-label="ドロワーを切り替える"
        icon={<MenuIcon w="24px" h="24px" />}
        onClick={onMdToggle}
      />
    </Box>
  </>
);

const DrawerMenuContainer = ({ onMdToggle }: ContainerProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DrawerMenu
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onMdToggle={onMdToggle}
    />
  );
};

export default DrawerMenuContainer;
