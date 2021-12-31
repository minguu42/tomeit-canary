import Image from "next/image";

import s from "./GoogleLoginButton.module.css";

type Props = {
  handleLogin: () => void;
};

export const GoogleLoginButton = ({ handleLogin }: Props): JSX.Element => (
  <button className={s.container}>
    <div className={s.layer} />
    <div className={s.logoBackground}>
      <Image
        src="/images/google.png"
        width={18}
        height={18}
        layout="fixed"
        alt="Google ロゴ"
        onClick={handleLogin}
      />
    </div>
    Sign in with Google
  </button>
);

const GoogleLoginButtonContainer = () => {
  const handleLogin = () => {
    console.log("test");
  };
  return <GoogleLoginButton handleLogin={handleLogin} />;
};

export default GoogleLoginButtonContainer;
