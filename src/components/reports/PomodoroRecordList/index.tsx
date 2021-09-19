import PomodoroRecordListItem from "./PomodoroRecordListItem";
import styles from "./styles.module.scss";
import { Pomodoro } from "types/pomodoro";

type Props = {
  pomodoros: Pomodoro[];
};

export const PomodoroList = ({ pomodoros }: Props): JSX.Element => (
  <div>
    <div className={styles.label}>
      <h3>ポモドーロ</h3>
      <p>ポモドーロ数：{pomodoros.length}</p>
    </div>
    <ul>
      {pomodoros.map((pomodoroRecord) => (
        <PomodoroRecordListItem
          key={pomodoroRecord.id}
          pomodoroRecord={pomodoroRecord}
        />
      ))}
    </ul>
  </div>
);

export default PomodoroList;
