import styles from "components/Catch/Catch.module.scss";
import GoogleLoginButton from "components/Catch/GoogleLoginButton";

type Props = {
  handleLogin: () => Promise<void>;
};

const Catch = ({ handleLogin }: Props): JSX.Element => (
  <div>
    <h3 className={styles.heading}>大事なことに集中する</h3>
    <p className={styles.description}>
      tomeit は大事なことに集中するためのタスク管理アプリです。
      <br />
      ポモドーロテクニックを使って、時間と集中力を有意義に使いましょう！
    </p>
    <GoogleLoginButton handleLogin={handleLogin} />
  </div>
);

export default Catch;
