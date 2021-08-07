import styles from "styles/components/modules/StatusBar.module.scss";

type Props = {
  restCount: number;
  undoneTaskNumber: number;
  pomodoroNumber: number;
};

const StatusBar = ({
  restCount,
  undoneTaskNumber,
  pomodoroNumber,
}: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.item}>
      <p className={styles.value}>{restCount}</p>
      <p className={styles.key}>休憩まで</p>
    </div>
    <div className={styles.item}>
      <p className={styles.value}>{undoneTaskNumber}</p>
      <p className={styles.key}>残りタスク数</p>
    </div>
    <div className={styles.item}>
      <p className={styles.value}>{pomodoroNumber}</p>
      <p className={styles.key}>今日のポモドーロ数</p>
    </div>
  </div>
);

export default StatusBar;
