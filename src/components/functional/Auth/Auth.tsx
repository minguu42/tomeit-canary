import { FC } from "react";

import Loading from "@/components/common/Loading";
import { useAuth } from "@/components/functional/Auth";

type Props = {
  children: JSX.Element;
};

const Auth: FC<Props> = ({ children }) => {
  const isLoading = useAuth();

  return isLoading ? <Loading /> : children;
};

export default Auth;
