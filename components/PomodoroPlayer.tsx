import { VFC } from "react";
// @ts-ignore
import cn from "classnames";

import { Task } from "components/TaskCard";
import styles from "styles/components/PomodoroPlayer.module.scss";
import TimerIcon from "components/icons/TimerIcon";
import PlayCircleIcon from "components/icons/PlayCircleIcon";
import CheckCircleIcon from "components/icons/CheckCircleIcon";
import PauseCircleIcon from "components/icons/PauseCircleIcon";
import StopCircleIcon from "components/icons/StopCircle";
import { convertSecondsForDisplay, formatStringByLength } from "lib/format";

type Props = {
  leftTime: number;
  task: Task | null;
  isPomodoro: boolean;
  isPlayingPomodoro: boolean;
  isTimerActive: boolean;
};

const PomodoroPlayer: VFC<Props> = ({
  leftTime,
  task,
  isPomodoro,
  isPlayingPomodoro,
  isTimerActive,
}) => (
  <div
    className={cn(styles.outer, {
      [styles.activeBackground]: isPomodoro,
      [styles.restBackground]: !isPomodoro,
    })}
  >
    <div className={styles.leftWrapper}>
      <div className={styles.timer}>
        <TimerIcon fill="#ffffff" />
        <p>{convertSecondsForDisplay(leftTime)}</p>
      </div>
      <p className={styles.name}>
        {task?.name === undefined ? "" : formatStringByLength(17, task.name)}
      </p>
    </div>
    <div className={styles.rightWrapper}>
      {isPomodoro && isTimerActive && (
        <button>
          <PauseCircleIcon fill="#ffffff" />
        </button>
      )}
      {isPomodoro && !isTimerActive && (
        <>
          {isPlayingPomodoro && (
            <button>
              <StopCircleIcon fill="#ffffff" />
            </button>
          )}
          <button>
            <PlayCircleIcon fill="#ffffff" />
          </button>
        </>
      )}
      {!isPomodoro && isTimerActive && (
        <button>
          <CheckCircleIcon fill="#ffffff" />
        </button>
      )}
      {!isPomodoro && !isTimerActive && (
        <button className={styles.button}>
          <PlayCircleIcon fill="#ffffff" />
        </button>
      )}
    </div>
  </div>
);

export default PomodoroPlayer;
