import LoadingCover from "components/common/LoadingCover";
import { useAuth } from "lib/auth";

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <LoadingCover /> : children;
};

export default Auth;
