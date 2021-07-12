import { VFC } from "react";

import styles from "styles/components/PomodoroLogItem.module.scss";
import TimerIcon from "./icons/TimerIcon";
import { convertDatetimeToPomodoroTerm } from "../lib/format";

export type PomodoroLog = {
  id: number;
  taskName: string;
  createdAt: string;
};

type Props = PomodoroLog;

const PomodoroLogItem: VFC<Props> = ({ taskName, createdAt }) => (
  <li className={styles.outer}>
    <div className={styles.leftWrapper}>
      <TimerIcon fill="#192f60" />
      <p>{taskName}</p>
    </div>
    <p className={styles.term}>{convertDatetimeToPomodoroTerm(createdAt)}</p>
  </li>
);

export default PomodoroLogItem;
