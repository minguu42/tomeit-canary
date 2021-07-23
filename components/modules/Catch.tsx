import styles from "styles/components/modules/Catch.module.scss";

const Catch = (): JSX.Element => (
  <div className={styles.catch}>
    <h3 className={styles.heading}>大事なことに集中する</h3>
    <p className={styles.description}>
      tomeit は大事なことに集中するためのタスク管理アプリです。
      <br />
      ポモドーロテクニックを使って、時間と集中力を有意義に使いましょう！
    </p>
  </div>
);

export default Catch;
