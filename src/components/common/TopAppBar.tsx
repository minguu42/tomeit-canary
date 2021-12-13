import {
  Heading,
  HStack,
  Spacer,
  IconButton,
  useColorMode,
  ColorMode,
} from "@chakra-ui/react";
import { MdHistory, MdLightMode, MdDarkMode } from "react-icons/md";

import DrawerMenu from "components/common/DrawerMenu";
import UserMenu from "components/models/user/UserMenu";

type ContainerProps = {
  onMdToggle: () => void;
};

type Props = ContainerProps & {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const TopAppBar = ({ colorMode, toggleColorMode, onMdToggle }: Props) => (
  <HStack
    h="56px"
    px="16px"
    spacing="8px"
    bg={colorMode == "light" ? "gray.100" : "whiteAlpha.200"}
  >
    <DrawerMenu onMdToggle={onMdToggle} />
    <Heading
      as="h2"
      fontSize="lg"
      color={colorMode == "light" ? "black" : "white"}
    >
      tomeit
    </Heading>
    <Spacer />
    <IconButton
      aria-label="履歴ページを開く"
      icon={<MdHistory />}
      fontSize="24px"
    />
    <IconButton
      aria-label="カラーモードの切り替え"
      icon={colorMode ? <MdLightMode /> : <MdDarkMode />}
      fontSize="24px"
      onClick={toggleColorMode}
    />
    <UserMenu />
  </HStack>
);

const TopAppBarContainer = ({ onMdToggle }: ContainerProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <TopAppBar
      onMdToggle={onMdToggle}
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
    />
  );
};

export default TopAppBarContainer;
