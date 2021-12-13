import {Button} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";

const GoogleLoginButton = (): JSX.Element => (
  <Button p="8px 16px" leftIcon={<FcGoogle />} bg="whiteAlpha.200">
    Sign in with Google
  </Button>
)

export default GoogleLoginButton;
