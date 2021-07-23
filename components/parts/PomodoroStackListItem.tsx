import styles from "styles/components/parts/PomodoroLogItem.module.scss";
import TimerIcon from "components/parts/TimerIcon";
import { convertDatetimeToPomodoroTerm } from "lib/format";
import type { PomodoroRecord } from "lib/pomodoro";

type Props = PomodoroRecord;

const PomodoroStackListItem = ({ taskName, createdAt }: Props): JSX.Element => (
  <li className={styles.outer}>
    <div className={styles.leftWrapper}>
      <TimerIcon fill="#192f60" />
      <p>{taskName}</p>
    </div>
    <p className={styles.term}>{convertDatetimeToPomodoroTerm(createdAt)}</p>
  </li>
);

export default PomodoroStackListItem;
