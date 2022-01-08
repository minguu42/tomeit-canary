import type { VFC } from "react";

import Loading from "@/components/common/Loading";
import { useAuth } from "lib/auth";

type Props = {
  children: JSX.Element;
};

const Auth: VFC<Props> = ({ children }) => {
  const isLoading = useAuth();

  return isLoading ? <Loading /> : children;
};

export default Auth;
