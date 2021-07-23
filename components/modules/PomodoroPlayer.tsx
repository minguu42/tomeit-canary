import { useState, useEffect } from "react";
// @ts-ignore
import cn from "classnames";

import { Task } from "components/parts/TaskCard";
import styles from "styles/components/modules/PomodoroPlayer.module.scss";
import TimerIcon from "components/icons/TimerIcon";
import PlayCircleIcon from "components/icons/PlayCircleIcon";
import CheckCircleIcon from "components/icons/CheckCircleIcon";
import PauseCircleIcon from "components/icons/PauseCircleIcon";
import StopCircleIcon from "components/icons/StopCircle";
import { convertSecondsForDisplay, formatStringByLength } from "lib/format";

type ContainerProps = {
  playingTask: Task | null;
  restCount: number;
  applyCompletePomodoro: (task: Task | null) => void;
};

type Props = {
  time: number;
  playingTask: Task | null;
  isPomodoro: boolean;
  isActive: boolean;
  handlePlayClick: () => void;
  handlePauseClick: () => void;
  handleSkipClick: () => void;
  handleStopClick: () => void;
};

const PomodoroPlayer = ({
  time,
  playingTask,
  isPomodoro,
  isActive,
  handlePlayClick,
  handlePauseClick,
  handleSkipClick,
  handleStopClick,
}: Props): JSX.Element => (
  <div
    className={cn(styles.outer, {
      [styles.activeBackground]: isPomodoro,
      [styles.restBackground]: !isPomodoro,
    })}
  >
    <div className={styles.leftWrapper}>
      <div className={styles.timer}>
        <TimerIcon fill="#ffffff" />
        <p>{convertSecondsForDisplay(time)}</p>
      </div>
      <p className={styles.name}>
        {playingTask?.name === undefined
          ? ""
          : formatStringByLength(17, playingTask.name)}
      </p>
    </div>
    <div className={styles.rightWrapper}>
      {isPomodoro && isActive && (
        <button onClick={handlePauseClick}>
          <PauseCircleIcon fill="#ffffff" />
        </button>
      )}
      {isPomodoro && !isActive && (
        <>
          <button onClick={handlePlayClick}>
            <PlayCircleIcon fill="#ffffff" />
          </button>
          {time !== 15 && (
            <button onClick={handleStopClick}>
              <StopCircleIcon fill="#ffffff" />
            </button>
          )}
        </>
      )}
      {!isPomodoro && isActive && (
        <button onClick={handleSkipClick}>
          <CheckCircleIcon fill="#ffffff" />
        </button>
      )}
      {!isPomodoro && !isActive && (
        <button onClick={handlePlayClick}>
          <PlayCircleIcon fill="#ffffff" />
        </button>
      )}
    </div>
  </div>
);

const PomodoroPlayerContainer = ({
  playingTask,
  restCount,
  applyCompletePomodoro,
}: ContainerProps): JSX.Element => {
  const [time, setTime] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);

  const handlePlayClick = () => {
    setIsActive(true);
  };

  const handlePauseClick = () => {
    setIsActive(false);
  };

  const handleSkipClick = () => {
    setTime(0);
  };

  const handleStopClick = () => {
    setTime(15);
    setIsActive(false);
  };

  useEffect(() => {
    if (playingTask !== null) {
      setIsActive(true);
    }
  }, [playingTask]);

  const tick = (): void => {
    setTime((t) => t - 1);
  };

  useEffect(() => {
    if (!isActive) return;

    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [isActive]);

  useEffect(() => {
    if (time === 0 && isPomodoro) {
      setIsActive(false);
      setIsPomodoro(false);
      setTime(restCount !== 1 ? 3 : 9);

      applyCompletePomodoro(playingTask);
    }

    if (time === 0 && !isPomodoro) {
      setIsActive(false);
      setIsPomodoro(true);
      setTime(15);
    }
  }, [time, playingTask, isPomodoro, restCount, applyCompletePomodoro]);

  return (
    <PomodoroPlayer
      time={time}
      playingTask={playingTask}
      isPomodoro={isPomodoro}
      isActive={isActive}
      handlePlayClick={handlePlayClick}
      handlePauseClick={handlePauseClick}
      handleSkipClick={handleSkipClick}
      handleStopClick={handleStopClick}
    />
  );
};

export default PomodoroPlayerContainer;
