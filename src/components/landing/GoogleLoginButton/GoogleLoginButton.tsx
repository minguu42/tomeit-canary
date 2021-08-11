import Image from "next/image";

import styles from "components/GoogleLoginButton/GoogleLoginButton.module.scss";

type Props = {
  handleLogin: () => Promise<void>;
};

const GoogleLoginButton = ({ handleLogin }: Props): JSX.Element => (
  <button onClick={handleLogin} className={styles.outer}>
    <Image src="/google.png" alt="Google Login Button" width={18} height={18} />
    <p className={styles.text}>Sign in with Google</p>
  </button>
);

export default GoogleLoginButton;
