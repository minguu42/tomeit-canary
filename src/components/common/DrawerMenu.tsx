import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import Navigation from "./Navigation";
import { MenuIcon } from "components/common/icons";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const DrawerMenu = ({ isOpen, onToggle }: Props): JSX.Element => (
  <>
    <IconButton
      aria-label="ドロワーを切り替える"
      icon={<MenuIcon w="24px" h="24px" />}
      onClick={onToggle}
    />
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
  </>
);

export default DrawerMenu;
