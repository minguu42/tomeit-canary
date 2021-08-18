import CircleIcon from "components/common/icons/CircleIcon";
import TimerIcon from "components/common/icons/TimerIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import styles from "components/home/TaskList/TaskListItem/TaskListItem.module.scss";
import { Task } from "types/task";
import { formatToLocalDate } from "lib/format";

type Props = {
  task: Task;
  isPlaying: boolean;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
};

export const TaskListItem = ({
  task,
  isPlaying,
  completeTask,
  setTask,
}: Props): JSX.Element => (
  <div className={styles.container}>
    {isPlaying && <TimerIcon fill="#192f60" />}
    {!isPlaying && (
      <button onClick={() => completeTask(task)}>
        <CircleIcon fill="#212121" />
      </button>
    )}

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

    {!isPlaying && (
      <button onClick={() => setTask(task)}>
        <PlayCircleIcon fill="#212121" />
      </button>
    )}
  </div>
);

export default TaskListItem;
