import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { MenuIcon } from "components/icons";
import Navigation from "./Navigation";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const DrawerMenu = ({ isOpen, onOpen, onClose }: Props): JSX.Element => (
  <>
    <IconButton
      aria-label="ドロワーを切り替える"
      colorScheme="purple"
      icon={<MenuIcon />}
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
  </>
);

const DrawerMenuContainer = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return <DrawerMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />;
};

export default DrawerMenuContainer;
