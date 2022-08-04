import { FC } from "react";

import Loading from "@/components/common/Loading";
import {
  useAccessControl,
  useAuth,
} from "@/components/features/Auth/Auth.hooks";

type Props = {
  children: JSX.Element;
};

const Auth: FC<Props> = ({ children }) => {
  const isLoading = useAuth();
  useAccessControl();

  return isLoading ? <Loading /> : children;
};

export default Auth;
