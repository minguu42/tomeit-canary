import { useState, useEffect } from "react";
import cn from "classnames";

import TimerIcon from "components/common/icons/TimerIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import StopCircleIcon from "components/common/icons/StopCircleIcon";
import CheckCircleIcon from "components/common/icons/CheckCircleIcon";
import styles from "./styles.module.scss";
import { playingTaskState, Task, tasksState } from "models/task";
import { formatTimerTime } from "lib/format";
import { useRecoilValue, useRecoilState } from "recoil";

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
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(true);
  const [restCount, setRestCount] = useState(4);
  const playingTask = useRecoilValue(playingTaskState);
  const [tasks, setTasks] = useRecoilState(tasksState);

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

  const handlePlayClick = (): void => {
    setIsActive(true);
  };

  const handleStopClick = (): void => {
    setTime(1500);
    setIsActive(false);
  };

  const handleSkipClick = (): void => {
    setTime(0);
  };

  useEffect(() => {
    if (playingTask !== null) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [playingTask]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      if (isNextPomodoro && playingTask) {
        setIsNextPomodoro(false);
        setTime(restCount !== 1 ? 300 : 900);

        // TODO: ポモドーロ実行 API を叩く
        const index = tasks.findIndex((t) => t.id === playingTask.id);
        playingTask.actualPomodoroNumber += 1;
        setTasks((prev) => [
          ...prev.slice(0, index),
          playingTask,
          ...prev.slice(index + 1),
        ]);
        setRestCount((c) => (c === 1 ? 4 : c - 1));
      } else {
        setIsActive(false);
        setIsNextPomodoro(true);
        setTime(15);
      }
    }
  }, [isNextPomodoro, playingTask, restCount, setTasks, tasks, time]);

  return (
    <PomodoroPlayer
      time={time}
      playingTask={playingTask}
      isNextPomodoro={isNextPomodoro}
      isActive={isActive}
      handlePlayClick={handlePlayClick}
      handleStopClick={handleStopClick}
      handleSkipClick={handleSkipClick}
    />
  );
};

export default PomodoroPlayerContainer;
