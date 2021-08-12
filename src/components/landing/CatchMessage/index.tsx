import styles from "components/landing/CatchMessage/CatchMessage.module.scss";

export const CatchMessage = (): JSX.Element => (
  <div className={styles.wrapper}>
    <h1 className={styles.advertisingSlogan}>
      tomeit で<br />
      やるべきことのみをやる
    </h1>
    <p className={styles.description}>
      tomeit は必要なことだけに集中するためのタスク管理アプリです。
      ポモドーロ・テクニックを使って、今やるべきことのみを行い,
      時間を有意義に使いましょう！
    </p>
  </div>
);

export default CatchMessage;
