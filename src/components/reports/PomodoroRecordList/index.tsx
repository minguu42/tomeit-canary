import PomodoroRecordListItem from "components/reports/PomodoroRecordList/PomodoroRecordListItem";
import styles from "components/reports/PomodoroRecordList/PomodoroRecordList.module.scss";
import { PomodoroRecord } from "types/pomodoro";

type Props = {
  pomodoroRecords: PomodoroRecord[];
};

export const PomodoroRecordList = ({ pomodoroRecords }: Props): JSX.Element => (
  <div>
    <div className={styles.label}>
      <h3>ポモドーロ</h3>
      <p>ポモドーロ数：{pomodoroRecords.length}</p>
    </div>
    <ul>
      {pomodoroRecords.map((pomodoroRecord) => (
        <PomodoroRecordListItem
          key={pomodoroRecord.id}
          pomodoroRecord={pomodoroRecord}
        />
      ))}
    </ul>
  </div>
);

const pomodoroRecords: PomodoroRecord[] = [
  {
    id: 1,
    taskTitle: "タスク1",
    completedAt: new Date("2021-01-01T00:00:00Z"),
  },
  {
    id: 2,
    taskTitle: "タスク2",
    completedAt: new Date("2021-01-01T00:30:00Z"),
  },
  {
    id: 3,
    taskTitle: "タスク2",
    completedAt: new Date("2021-01-01T01:00:00Z"),
  },
];

const PomodoroRecordListContainer = (): JSX.Element => {
  return <PomodoroRecordList pomodoroRecords={pomodoroRecords} />;
};

export default PomodoroRecordListContainer;
