import { useState, useEffect } from "react";
import cn from "classnames";

import TimerIcon from "components/common/icons/TimerIcon";
import PlayCircleIcon from "components/common/icons/PlayCircleIcon";
import StopCircleIcon from "components/common/icons/StopCircleIcon";
import CheckCircleIcon from "components/common/icons/CheckCircleIcon";
import styles from "./styles.module.scss";
import {
  tasksState,
  filteredTasksState,
  playingTaskState,
  Task,
} from "models/task";
import { formatTimerTime } from "lib/format";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { makeSound } from "lib/sound";

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
    <audio src="/complete.mp3" id="complete" />
    <audio src="/finish_rest.mp3" id="finish_rest" />
  </div>
);

const POMODORO_TIME = 15;
const SHORT_REST_TIME = 3;
const LONG_REST_TIME = 9;
const INIT_REST_COUNT = 4;

const PomodoroPlayerContainer = (): JSX.Element => {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(true);
  const [restCount, setRestCount] = useState(INIT_REST_COUNT);
  const [playingTask, setPlayingTask] = useRecoilState(playingTaskState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const setTasks = useSetRecoilState(tasksState);

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
    setTime(POMODORO_TIME);
    setIsActive(false);
  };

  const handleSkipClick = (): void => {
    setTime(0);
  };

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      if (isNextPomodoro && playingTask) {
        makeSound("#complete").catch((err) => console.error(err));
        setIsNextPomodoro(false);
        setTime(restCount !== 1 ? SHORT_REST_TIME : LONG_REST_TIME);

        // TODO: ポモドーロ実行 API を叩く
        const index = filteredTasks.findIndex((t) => t.id === playingTask.id);
        const tmp = { ...playingTask };
        tmp.actualPomodoroNumber += 1;
        setTasks((prev) => [
          ...prev.slice(0, index),
          tmp,
          ...prev.slice(index + 1),
        ]);
        setPlayingTask(tmp);
        setRestCount((c) => (c === 1 ? INIT_REST_COUNT : c - 1));
      } else {
        makeSound("#finish_rest").catch((err) => console.error(err));
        setIsNextPomodoro(true);
        setTime(POMODORO_TIME);
      }
    }
  }, [
    isNextPomodoro,
    playingTask,
    restCount,
    setPlayingTask,
    setTasks,
    filteredTasks,
    time,
  ]);

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
