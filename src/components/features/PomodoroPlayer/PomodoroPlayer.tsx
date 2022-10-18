import { FC, useEffect, useState } from "react";

import * as s from "./PomodoroPlayer.css";
import StandardIconButton from "@/components/common/StandardIconButton";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@/components/icons";
import { formatSecondsToMinutesSeconds } from "@/lib/formatDate";
import { usePlayingTask } from "@/globalStates/playingTask";

const POMODORO_TIME = 1;
const SHORT_REST_TIME = 3;
const LONG_REST_TIME = 9;
const INIT_REST_COUNT = 4;

const PomodoroPlayer: FC = () => {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(false);
  const [restCount, setRestCount] = useState(INIT_REST_COUNT);
  const playingTask = usePlayingTask();

  useEffect(() => {
    if (playingTask !== null) {
      setIsActive(true);
    }
  }, [playingTask]);

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      if (isNextPomodoro) {
        setTime(POMODORO_TIME);
        setRestCount((prev) => (prev === 1 ? 4 : prev - 1));
      } else if (!isNextPomodoro && restCount !== 1) {
        setTime(SHORT_REST_TIME);
      } else if (!isNextPomodoro && restCount === 1) {
        setTime(LONG_REST_TIME);
      }
      setIsNextPomodoro((prev) => !prev);
    }
  }, [isNextPomodoro, restCount, time]);

  const startPomodoro = () => {
    setIsActive(true);
  };

  const pausePomodoro = () => {
    setIsActive(false);
  };

  const stopPomodoro = () => {
    setTime(1500);
    setIsActive(false);
  };

  if (playingTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      {!isActive && time === 1500 && (
        <StandardIconButton
          icon={<PlayCircleIcon />}
          label="ポモドーロの開始"
          onClick={startPomodoro}
        />
      )}
      {!isActive && time !== 1500 && (
        <>
          <StandardIconButton
            icon={<PlayCircleIcon />}
            label="ポモドーロの開始"
            onClick={startPomodoro}
          />
          <StandardIconButton
            icon={<StopCircleIcon />}
            label="ポモドーロの中止"
            onClick={stopPomodoro}
          />
        </>
      )}
      {isActive && (
        <StandardIconButton
          icon={<PauseCircleIcon />}
          label="ポモドーロの停止"
          onClick={pausePomodoro}
        />
      )}
      <h3 className={s.mgr16}>{formatSecondsToMinutesSeconds(time)}</h3>
      <p>{playingTask.title}</p>
    </div>
  );
};

export default PomodoroPlayer;
