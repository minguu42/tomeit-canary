import { FC, useEffect, useState } from "react";

import * as s from "./PomodoroPlayer.css";
import IconButton from "@/components/common/IconButton";
import { DoneIcon, PauseIcon, PlayArrowIcon, StopIcon } from "@/components/common/icons";
import { formatSecondsToMinutesSeconds } from "@/lib/formatDate";
import { usePlayingTask } from "@/globalStates/playingTask";

const POMODORO_TIME = 1500;
const SHORT_BREAK_TIME = 300;
const LONG_BREAK_TIME = 900;
const INIT_BREAK_COUNT = 4;

const PomodoroPlayer: FC = () => {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(false);
  const [breakCount, setBreakCount] = useState(INIT_BREAK_COUNT);
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
        setBreakCount((prev) => (prev === 1 ? 4 : prev - 1));
      } else if (!isNextPomodoro && breakCount !== 1) {
        setTime(SHORT_BREAK_TIME);
      } else if (!isNextPomodoro && breakCount === 1) {
        setTime(LONG_BREAK_TIME);
      }
      setIsNextPomodoro((prev) => !prev);
    }
  }, [isNextPomodoro, breakCount, time]);

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

  const skipBreak = () => {
    setTime(0);
  };

  if (playingTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      {!isActive &&
        (time === POMODORO_TIME ||
          ((time === SHORT_BREAK_TIME || time === LONG_BREAK_TIME) && isNextPomodoro)) && (
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
        <IconButton icon={<DoneIcon />} label="休憩の完了" onClick={skipBreak} />
      )}
      <h3 className={s.mgr16}>{formatSecondsToMinutesSeconds(time)}</h3>
      <p>{playingTask.title}</p>
    </div>
  );
};

export default PomodoroPlayer;
