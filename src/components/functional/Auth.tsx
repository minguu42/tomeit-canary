import {Center, Spinner, Text} from "@chakra-ui/react";

import { useAuth } from "lib/auth";

type Props = {
    children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
    const isLoading = useAuth();

    return isLoading ? (
        <Center h="100vh">
            <Spinner />
            <Text ml="8px">Loading...</Text>
        </Center>
    ) : (
        children
    );
};

export default Auth;
