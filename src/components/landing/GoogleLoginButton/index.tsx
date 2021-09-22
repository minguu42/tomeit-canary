import Image from "next/image";

import s from "./styles.module.scss";
import { login } from "contexts/AuthContext";

type Props = {
  handleLogin: () => Promise<void>;
};

export const GoogleLoginButton = ({ handleLogin }: Props): JSX.Element => (
  <button onClick={handleLogin} className={s.container}>
    <Image src="/google.png" alt="Google logo" width={18} height={18} />
    <p className={s.label}>Sign in with Google</p>
  </button>
);

const GoogleLoginButtonContainer = (): JSX.Element => {
  const handleLogin = async (): Promise<void> => {
    try {
      await login();
    } catch {
      window.alert("ログインに失敗しました。もう一度お試しください");
    }
  };

  return <GoogleLoginButton handleLogin={handleLogin} />;
};

export default GoogleLoginButtonContainer;
