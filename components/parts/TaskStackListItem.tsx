import styles from "styles/components/parts/TaskLogItem.module.scss";
import TimerIcon from "components/parts/TimerIcon";
import { convertDatetimeToTime } from "lib/format";
import {Task} from "lib/task";

type Props = Task;

const TaskStackListItem = ({ name, pomodoroCount, updatedAt }: Props) => (
  <li className={styles.outer}>
    <div className={styles.leftWrapper}>
      <div className={styles.countWrapper}>
        <TimerIcon fill="#192f60" />
        <p>{pomodoroCount}</p>
      </div>
      <p className={styles.name}>{name}</p>
    </div>
    <p className={styles.time}>{convertDatetimeToTime(updatedAt)}</p>
  </li>
);

export default TaskStackListItem;
