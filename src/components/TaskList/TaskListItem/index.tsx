import TimerIcon from "components/icons/TimerIcon";
import CircleIcon from "components/icons/CircleIcon";
import PlayCircleIcon from "components/icons/PlayCircleIcon";
import s from "./styles.module.scss";
import { Task } from "models/task";
import { formatToJapanDateString } from "lib/format";

type Props = {
  task: Task;
  isTaskSet: boolean;
  isPomodoroPlaying: boolean;
  completeTask: (task: Task) => void;
  setTask: (task: Task) => void;
};

export const TaskListItem = ({
  task,
  isTaskSet,
  isPomodoroPlaying,
  completeTask,
  setTask,
}: Props): JSX.Element => (
  <li className={s.container}>
    {isTaskSet && isPomodoroPlaying && <TimerIcon fill="#192f60" />}
    {(!isTaskSet || !isPomodoroPlaying) && (
      <button onClick={() => completeTask(task)}>
        <CircleIcon fill="#212121" />
      </button>
    )}

    <div className={s.main}>
      <h3 className={s.title}>{task.title}</h3>
      <div className={s.captions}>
        {task.actualPomodoroNum > 0 && (
          <div className={s.actualWrapper}>
            <TimerIcon size={16} fill="#666666" />
            <p>{task.actualPomodoroNum}</p>
          </div>
        )}

        {task.expectedPomodoroNum > 0 && (
          <div className={s.expectedWrapper}>
            {task.actualPomodoroNum > 0 && <p className={s.divider}>/</p>}
            <TimerIcon size={16} fill="#9e9e9e" />
            <p>{task.expectedPomodoroNum}</p>
          </div>
        )}

        {task.dueOn !== null && (
          <>
            {(task.expectedPomodoroNum > 0 || task.actualPomodoroNum > 0) && (
              <div className={s.spacing} />
            )}
            <p className={s.dueOn}>{formatToJapanDateString(task.dueOn)}</p>
          </>
        )}
      </div>
    </div>

    {(!isTaskSet || !isPomodoroPlaying) && (
      <button onClick={() => setTask(task)}>
        <PlayCircleIcon fill="#212121" />
      </button>
    )}
  </li>
);

export default TaskListItem;
