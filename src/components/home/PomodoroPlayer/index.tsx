// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";

import TimerIcon from "components/common/icons/TimerIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import StopCircleIcon from "components/common/icons/StopCircleIcon";
import CheckCircleIcon from "components/common/icons/CheckCircleIcon";
import styles from "components/home/PomodoroPlayer/PomodoroPlayer.module.scss";
import { Task } from "types/task";
import { formatTimerTime } from "lib/format";

type Props = {
  time: number;
  playingTask: Task | null;
  isNextPomodoro: boolean;
  isActive: boolean;
  handlePlayClick: () => void;
  handleStopClick: () => void;
  handleSkipClick: () => void;
};

export const PomodoroPlayer = ({
  time,
  playingTask,
  isNextPomodoro,
  isActive,
  handlePlayClick,
  handleStopClick,
  handleSkipClick,
}: Props): JSX.Element => (
  <div
    className={cn(styles.container, {
      [styles.isPomodoro]: isNextPomodoro,
      [styles.isNotPomodoro]: !isNextPomodoro,
    })}
  >
    <div className={styles.timer}>
      {isNextPomodoro && <TimerIcon fill="#ffffff" />}
      {!isNextPomodoro && <TimerIcon fill="#080a0f" />}
      <p>{formatTimerTime(time)}</p>
    </div>

    {playingTask !== null && (
      <p className={styles.title}>{playingTask.title}</p>
    )}

    {playingTask === null && <PlayCircleIcon fill="#707e9c" />}
    {playingTask !== null && isNextPomodoro && isActive && (
      <button onClick={handleStopClick}>
        <StopCircleIcon fill="#ffffff" />
      </button>
    )}
    {playingTask !== null && isNextPomodoro && !isActive && (
      <button onClick={handlePlayClick}>
        <PlayCircleIcon fill="#ffffff" />
      </button>
    )}
    {playingTask !== null && !isNextPomodoro && isActive && (
      <button onClick={handleSkipClick}>
        <CheckCircleIcon fill="#080a0f" />
      </button>
    )}
    {playingTask !== null && !isNextPomodoro && !isActive && (
      <button onClick={handlePlayClick}>
        <PlayCircleIcon fill="#080a0f" />
      </button>
    )}
  </div>
);

const PomodoroPlayerContainer = (): JSX.Element => {
  const handlePlayClick = (): void => {
    return;
  };
  const handleStopClick = (): void => {
    return;
  };
  const handleSkipClick = (): void => {
    return;
  };
  return (
    <PomodoroPlayer
      time={1500}
      playingTask={null}
      isNextPomodoro={true}
      isActive={false}
      handlePlayClick={handlePlayClick}
      handleStopClick={handleStopClick}
      handleSkipClick={handleSkipClick}
    />
  );
};

export default PomodoroPlayerContainer;
