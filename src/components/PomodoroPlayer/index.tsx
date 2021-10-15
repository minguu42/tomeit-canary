import { useState, useEffect } from "react";
import cn from "classnames";

import TimerIcon from "components/icons/TimerIcon";
import PlayCircleIcon from "components/icons/PlayCircleIcon";
import StopCircleIcon from "components/icons/StopCircleIcon";
import CheckCircleIcon from "components/icons/CheckCircleIcon";
import s from "./styles.module.scss";
import {
  Task,
  useTasks,
  useTasksActions,
  usePlayingTask,
  usePlayingTaskActions,
} from "models/task";
import { isRestCountResponse } from "models/pomodoro";
import { formatTimerTime } from "lib/format";
import { makeSound } from "lib/sound";
import { useUser } from "lib/auth";
import { getData, postData } from "lib/fetch";
import { useIsPomodoroPlayingActions } from "lib/states";

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
    className={cn(s.player, {
      [s.isPomodoro]: isNextPomodoro,
      [s.isNotPomodoro]: !isNextPomodoro,
    })}
  >
    <div className={s.timer}>
      {isNextPomodoro && <TimerIcon fill="#ffffff" />}
      {!isNextPomodoro && <TimerIcon fill="#080a0f" />}
      <p>{formatTimerTime(time)}</p>
    </div>

    {playingTask !== null && <p className={s.title}>{playingTask.title}</p>}

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

const POMODORO_TIME = 1500;
const SHORT_REST_TIME = 300;
const LONG_REST_TIME = 900;
const INIT_REST_COUNT = 4;

const PomodoroPlayerContainer = (): JSX.Element => {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(true);
  const [restCount, setRestCount] = useState(INIT_REST_COUNT);
  const tasks = useTasks();
  const { replaceTask } = useTasksActions();
  const playingTask = usePlayingTask();
  const { setTaskInPlayer } = usePlayingTaskActions();
  const user = useUser();
  const { startPlayingPomodoro, endPlayingPomodoro } =
    useIsPomodoroPlayingActions();

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
    if (isNextPomodoro) {
      startPlayingPomodoro();
    }
  };

  const handleStopClick = (): void => {
    setTime(POMODORO_TIME);
    setIsActive(false);
  };

  const handleSkipClick = (): void => {
    setTime(0);
  };

  useEffect(() => {
    getData("/pomodoros/rest-count", user)
      .then((data) => {
        if (isRestCountResponse(data)) {
          setRestCount(data.restCount);
        }
      })
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      if (isNextPomodoro && playingTask) {
        makeSound("#complete").catch((err) => console.error(err));
        setIsNextPomodoro(false);
        endPlayingPomodoro();
        setTime(restCount !== 1 ? SHORT_REST_TIME : LONG_REST_TIME);

        postData("/pomodoros", { taskID: playingTask.id }, user).catch((err) =>
          console.error(err)
        );
        const index = tasks.findIndex((t) => t.id === playingTask.id);
        const newTask = { ...playingTask };
        newTask.actualPomodoroNum += 1;
        replaceTask(index, newTask);
        setTaskInPlayer(newTask);
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
    time,
    user,
    endPlayingPomodoro,
    replaceTask,
    setTaskInPlayer,
    tasks,
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
