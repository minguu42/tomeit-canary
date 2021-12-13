import {
  Heading,
  HStack,
  Spacer,
  IconButton,
  useColorMode,
  ColorMode,
} from "@chakra-ui/react";

import DrawerMenu from "components/common/DrawerMenu";
import UserMenu from "components/models/user/UserMenu";
import {
  HistoryIcon,
  LightModeIcon,
  DarkModeIcon,
} from "components/common/icons";

type ContainerProps = {
  isOpen: boolean;
  onToggle: () => void;
};

type Props = ContainerProps & {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const TopAppBar = ({ isOpen, onToggle, colorMode, toggleColorMode }: Props) => (
  <HStack
    h="56px"
    px="16px"
    spacing="8px"
    bg={colorMode == "light" ? "gray.100" : "whiteAlpha.200"}
  >
    <DrawerMenu isOpen={isOpen} onToggle={onToggle} />
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
      icon={<HistoryIcon />}
      fontSize="24px"
    />
    <IconButton
      aria-label="カラーモードの切り替え"
      icon={colorMode ? <LightModeIcon /> : <DarkModeIcon />}
      fontSize="24px"
      onClick={toggleColorMode}
    />
    <UserMenu />
  </HStack>
);

const TopAppBarContainer = ({
  isOpen,
  onToggle,
}: ContainerProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <TopAppBar
      isOpen={isOpen}
      onToggle={onToggle}
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
    />
  );
};

export default TopAppBarContainer;
