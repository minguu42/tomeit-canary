import TimerIcon from "components/common/icons/TimerIcon";
import styles from "./styles.module.scss";
import { formatToLocalPomodoroDuring } from "lib/format";
import { Pomodoro } from "types/pomodoro";

type Props = {
  pomodoroRecord: Pomodoro;
};

export const PomodoroRecordListItem = ({
  pomodoroRecord,
}: Props): JSX.Element => (
  <div className={styles.container}>
    <TimerIcon fill="#192f60" />
    <p className={styles.taskTitle}>{pomodoroRecord.taskTitle}</p>
    <p className={styles.pomodoroDuring}>
      {formatToLocalPomodoroDuring(pomodoroRecord.completedOn)}
    </p>
  </div>
);

export default PomodoroRecordListItem;
