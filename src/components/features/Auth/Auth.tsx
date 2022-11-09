import { FC } from "react";

import { Loading } from "@/components/common/Loading";
import { useAccessControl, useAuth } from "./Auth.hooks";

type Props = {
  children: JSX.Element;
};

export const Auth: FC<Props> = ({ children }) => {
  const isLoading = useAuth();
  useAccessControl();

  return isLoading ? <Loading /> : children;
};
