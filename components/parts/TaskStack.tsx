import styles from "styles/components/parts/TaskLogItem.module.scss";
import TimerIcon from "components/parts/TimerIcon";
import { TaskRecord } from "lib/task";
import { convertDatetimeToTime } from "lib/format";

type Props = TaskRecord;

const TaskStack = ({ name, pomodoroCount, completeAt }: Props) => (
  <li className={styles.outer}>
    <div className={styles.leftWrapper}>
      <div className={styles.countWrapper}>
        <TimerIcon fill="#192f60" />
        <p>{pomodoroCount}</p>
      </div>
      <p className={styles.name}>{name}</p>
    </div>
    <p className={styles.time}>{convertDatetimeToTime(completeAt)}</p>
  </li>
);

export default TaskStack;
