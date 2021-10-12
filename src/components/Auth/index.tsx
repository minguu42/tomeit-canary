import Loading from "components/Loading";
import { useAuth } from "lib/auth";

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <Loading /> : children;
};

export default Auth;
