import { Center, Button, useColorMode, ColorMode } from "@chakra-ui/react";

import { GoogleIcon } from "components/common/icons";

type Props = {
  colorMode: ColorMode;
};

const GoogleLoginButton = ({ colorMode }: Props): JSX.Element => (
  <Button
    p="0 8px 0 0"
    color={colorMode == "light" ? "blackAlpha.800" : "white"}
    bgColor={colorMode == "light" ? "#FFFFFF" : "#4285F4"}
    borderRadius="4px"
    shadow="md"
  >
    <Center
      mr="12px"
      width="40px"
      height="40px"
      bgColor="#FFFFFF"
      border="1px"
      borderColor={colorMode == "light" ? "#FFFFFF" : "#4285F4"}
      borderRadius="4px"
    >
      <GoogleIcon />
    </Center>
    Sign in with Google
  </Button>
);

const GoogleLoginButtonContainer = (): JSX.Element => {
  const { colorMode } = useColorMode();
  return <GoogleLoginButton colorMode={colorMode} />;
};

export default GoogleLoginButtonContainer;
