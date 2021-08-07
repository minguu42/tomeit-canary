import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/StackSection/TaskStackListItem.module.scss";
import { convertDatetimeToTime } from "lib/format";

type Props = {
  name: string;
  pomodoroCount: number;
  updatedAt: string | undefined;
};

const TaskStackListItem = ({
  name,
  pomodoroCount,
  updatedAt,
}: Props): JSX.Element => (
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
