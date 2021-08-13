import CircleIcon from "components/common/icons/CircleIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import styles from "components/common/TaskListItem/TaskListItem.module.scss";
import { Task } from "types/task";
import { displayLocalDate, formatDate } from "lib/format";

type Props = {
  task: Task;
};

export const TaskListItem = ({ task }: Props): JSX.Element => (
  <div className={styles.container}>
    <button>
      <CircleIcon fill="#212121" />
    </button>
    <div className={styles.main}>
      {task.actualPomodoroNum === 0 &&
        task.expectedPomodoroNum === 0 &&
        formatDate(task.dueOn) === "0001-01-01" && (
          <p className={styles.title}>{task.title}</p>
        )}
      {(task.actualPomodoroNum !== 0 ||
        task.expectedPomodoroNum !== 0 ||
        formatDate(task.dueOn) !== "0001-01-01") && (
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

            {formatDate(task.dueOn) !== "0001-01-01" && (
              <p className={styles.dueOn}>{displayLocalDate(task.dueOn)}</p>
            )}
          </div>
        </>
      )}
    </div>
    <button>
      <PlayCircleIcon fill="#212121" />
    </button>
  </div>
);

export default TaskListItem;
