import styles from "styles/components/parts/PomodoroLogList.module.scss";
import PomodoroStackListItem from "components/parts/PomodoroStackListItem";
import type { PomodoroRecord } from "lib/pomodoro";

type Props = {
  pomodoroRecords: PomodoroRecord[];
};

const PomodoroStackList = ({ pomodoroRecords }: Props): JSX.Element => (
  <div className={styles.outer}>
    <div className={styles.header}>
      <p>実行したポモドーロ</p>
    </div>
    <ul className={styles.list}>
      {pomodoroRecords.map((log) => (
        <PomodoroStackListItem
          key={log.id}
          id={log.id}
          taskName={log.taskName}
          createdAt={log.createdAt}
        />
      ))}
    </ul>
  </div>
);

export default PomodoroStackList;
