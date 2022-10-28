import { FC, useEffect, useState } from "react";

import * as s from "./PomodoroPlayer.css";
import IconButton from "@/components/common/IconButton";
import { PauseIcon, PlayArrowIcon, StopIcon } from "@/components/common/icons";
import { formatSecondsToMinutesSeconds } from "@/lib/formatDate";
import { usePlayingTask } from "@/globalStates/playingTask";
import Done from "@/components/common/icons/Done";

const POMODORO_TIME = 1500;
const SHORT_REST_TIME = 300;
const LONG_REST_TIME = 900;
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
    setTime(POMODORO_TIME);
    setIsActive(false);
  };

  const doneRest = () => {
    setTime(0);
  };

  if (playingTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      {!isActive &&
        (time === POMODORO_TIME ||
          ((time === SHORT_REST_TIME || time === LONG_REST_TIME) && isNextPomodoro)) && (
          <IconButton icon={<PlayArrowIcon />} label="ポモドーロの開始" onClick={startPomodoro} />
        )}
      {!isActive && time !== POMODORO_TIME && !isNextPomodoro && (
        <>
          <IconButton icon={<PlayArrowIcon />} label="ポモドーロの再開" onClick={startPomodoro} />
          <IconButton icon={<StopIcon />} label="ポモドーロの中止" onClick={stopPomodoro} />
        </>
      )}
      {isActive && !isNextPomodoro && (
        <IconButton icon={<PauseIcon />} label="ポモドーロの停止" onClick={pausePomodoro} />
      )}
      {isActive && isNextPomodoro && (
        <IconButton icon={<Done />} label="休憩の完了" onClick={doneRest} />
      )}
      <h3 className={s.mgr16}>{formatSecondsToMinutesSeconds(time)}</h3>
      <p>{playingTask.title}</p>
    </div>
  );
};

export default PomodoroPlayer;
