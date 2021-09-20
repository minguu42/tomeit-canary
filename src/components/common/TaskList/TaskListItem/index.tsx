import TimerIcon from "components/common/icons/TimerIcon";
import CircleIcon from "components/common/icons/CircleIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import s from "./styles.module.scss";
import { Task } from "models/task";
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
  <div className={s.container}>
    {isPlaying && <TimerIcon fill="#192f60" />}
    {!isPlaying && (
      <button onClick={() => completeTask(task)}>
        <CircleIcon fill="#212121" />
      </button>
    )}

    <div className={s.main}>
      <h3 className={s.title}>{task.title}</h3>
      <div className={s.captions}>
        {task.actualPomodoroNumber > 0 && (
          <div className={s.actualWrapper}>
            <TimerIcon size={16} fill="#666666" />
            <p>{task.actualPomodoroNumber}</p>
          </div>
        )}

        {task.expectedPomodoroNumber > 0 && (
          <div className={s.expectedWrapper}>
            {task.actualPomodoroNumber > 0 && <p className={s.divider}>/</p>}
            <TimerIcon size={16} fill="#9e9e9e" />
            <p>{task.expectedPomodoroNumber}</p>
          </div>
        )}

        {task.dueOn !== null && (
          <>
            {(task.expectedPomodoroNumber > 0 ||
              task.actualPomodoroNumber > 0) && <div className={s.spacing} />}
            <p className={s.dueOn}>{formatToLocalDate(task.dueOn)}</p>
          </>
        )}
      </div>
    </div>

    {!isPlaying && (
      <button onClick={() => setTask(task)}>
        <PlayCircleIcon fill="#212121" />
      </button>
    )}
  </div>
);

export default TaskListItem;
