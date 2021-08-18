import CheckCircleIcon from "components/common/icons/CheckCircleIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import styles from "components/reports/TaskRecordList/TaskRecordListItem.module.scss";
import { Task } from "types/task";
import { formatToLocalDate, formatToLocalTime } from "lib/format";

type Props = {
  task: Task;
};

export const TaskRecordListItem = ({ task }: Props): JSX.Element => (
  <div className={styles.container}>
    <CheckCircleIcon fill="#192f60" />

    <div className={styles.main}>
      {task.actualPomodoroNum === 0 &&
        task.expectedPomodoroNum === 0 &&
        task.dueOn === null && <p className={styles.title}>{task.title}</p>}
      {(task.actualPomodoroNum !== 0 ||
        task.expectedPomodoroNum !== 0 ||
        task.dueOn !== null) && (
        <>
          <p className={styles.title}>{task.title}</p>
          <div className={styles.captions}>
            {task.actualPomodoroNum > 0 && task.expectedPomodoroNum > 0 && (
              <div className={styles.pomodoroNumWrapper}>
                <div className={styles.actualPomodoroNumWrapper}>
                  <TimerIcon size={16} fill="#666666" />
                  <p>{task.actualPomodoroNum}</p>
                </div>
                <p className={styles.divider}>/</p>
                <div className={styles.expectedPomodoroNumWrapper}>
                  <TimerIcon size={16} fill="#9e9e9e" />
                  <p>{task.expectedPomodoroNum}</p>
                </div>
              </div>
            )}

            {task.actualPomodoroNum > 0 && task.expectedPomodoroNum === 0 && (
              <div className={styles.actualPomodoroNumWrapper}>
                <TimerIcon size={16} fill="#666666" />
                <p>{task.actualPomodoroNum}</p>
              </div>
            )}

            {task.actualPomodoroNum === 0 && task.expectedPomodoroNum > 0 && (
              <div className={styles.expectedPomodoroNumWrapper}>
                <TimerIcon size={16} fill="#9e9e9e" />
                <p>{task.expectedPomodoroNum}</p>
              </div>
            )}

            {task.dueOn !== null && (
              <p className={styles.dueOn}>{formatToLocalDate(task.dueOn)}</p>
            )}
          </div>
        </>
      )}
    </div>

    <p className={styles.completedAt}>
      {task.completedAt !== null && formatToLocalTime(task.completedAt)}
    </p>
  </div>
);

export default TaskRecordListItem;
