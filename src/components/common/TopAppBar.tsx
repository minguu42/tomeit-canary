import {
  HStack,
  Spacer,
  IconButton,
  Heading,
  useColorMode,
  ColorMode,
} from "@chakra-ui/react";

import UserMenu from "components/models/user/UserMenu";
import {
  MenuIcon,
  HistoryIcon,
  LightModeIcon,
  DarkModeIcon,
} from "components/common/icons";

type ContainerProps = {
  onToggle: () => void;
};

type Props = ContainerProps & {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const TopAppBar = ({ onToggle, colorMode, toggleColorMode }: Props) => (
  <HStack
    h="56px"
    px="16px"
    spacing="8px"
    bg={colorMode == "light" ? "gray.100" : "whiteAlpha.200"}
  >
    <IconButton
      aria-label="ドロワーを切り替える"
      icon={<MenuIcon />}
      onClick={onToggle}
    />
    <Heading
      as="h2"
      fontSize="lg"
      color={colorMode == "light" ? "black" : "white"}
    >
      tomeit
    </Heading>
    <Spacer />
    <IconButton aria-label="履歴ページを開く" icon={<HistoryIcon />} />
    <IconButton
      aria-label="カラーモードの切り替え"
      icon={colorMode ? <LightModeIcon /> : <DarkModeIcon />}
      onClick={toggleColorMode}
    />
    <UserMenu />
  </HStack>
);

const TopAppBarContainer = ({ onToggle }: ContainerProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <TopAppBar
      onToggle={onToggle}
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
    />
  );
};

export default TopAppBarContainer;
