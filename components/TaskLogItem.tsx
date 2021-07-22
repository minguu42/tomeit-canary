import styles from "styles/components/TaskLogItem.module.scss";
import TimerIcon from "components/icons/TimerIcon";
import { convertDatetimeToTime } from "lib/format";

export type TaskLog = {
  id: number;
  name: string;
  pomodoroCount: number;
  completeAt: string;
};

type Props = TaskLog;

const TaskLogItem = ({ name, pomodoroCount, completeAt }: Props) => (
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

export default TaskLogItem;
