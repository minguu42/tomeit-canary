import PomodoroStackListItem from "components/StackSection/PomodoroStackListItem";
import styles from "components/StackSection/PomodoroStackList.module.scss";
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
      {pomodoroRecords.map((record) => (
        <PomodoroStackListItem
          key={record.id}
          id={record.id}
          taskName={record.taskName}
          createdAt={record.createdAt}
        />
      ))}
    </ul>
  </div>
);

export default PomodoroStackList;
