import Image from "next/image";

import styles from "components/landing/GoogleLoginButton/GoogleLoginButton.module.scss";
import { login } from "contexts/AuthContext";

type Props = {
  handleLogin: () => Promise<void>;
};

export const GoogleLoginButton = ({ handleLogin }: Props): JSX.Element => (
  <button onClick={handleLogin} className={styles.container}>
    <Image src="/google.png" alt="Google logo image" width={18} height={18} />
    <p className={styles.label}>Sign in with Google</p>
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
