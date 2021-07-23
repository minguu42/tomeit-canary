import styles from "styles/components/PomodoroLogList.module.scss";
import PomodoroLogItem, { PomodoroLog } from "components/parts/PomodoroLogItem";

type Props = {
  pomodoroLogs: PomodoroLog[];
};

const PomodoroLogList = ({ pomodoroLogs }: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>実行したポモドーロ</p>
    </div>
    <ul className={styles.list}>
      {pomodoroLogs.map((log) => (
        <PomodoroLogItem
          key={log.id}
          id={log.id}
          taskName={log.taskName}
          createdAt={log.createdAt}
        />
      ))}
    </ul>
  </div>
);

export default PomodoroLogList;
