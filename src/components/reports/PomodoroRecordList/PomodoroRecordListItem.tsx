import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/reports/PomodoroRecordList/PomodoroRecordListItem.module.scss";
import { formatToLocalPomodoroDuring } from "lib/format";
import { PomodoroRecord } from "types/pomodoro";

type Props = {
  pomodoroRecord: PomodoroRecord;
};

export const PomodoroRecordListItem = ({
  pomodoroRecord,
}: Props): JSX.Element => (
  <div className={styles.container}>
    <TimerIcon fill="#192f60" />
    <p className={styles.taskTitle}>{pomodoroRecord.taskTitle}</p>
    <p className={styles.pomodoroDuring}>
      {formatToLocalPomodoroDuring(pomodoroRecord.completedAt)}
    </p>
  </div>
);

export default PomodoroRecordListItem;
