import { VFC, useState, useEffect } from "react";
import cn from "classnames";

import {
  PlayCircleIcon,
  StopCircleIcon,
  CheckCircleIcon,
  PauseCircleIcon,
} from "@/components/common/icons";
import s from "./PomodoroTimer.module.css";
import { formatTimerTime } from "@/lib/format";

const POMODORO_TIME = 15;
const SHORT_REST_TIME = 300;
const LONG_REST_TIME = 900;
const INIT_REST_COUNT = 4;

const PomodoroTimer: VFC = () => {
  const taskTitle = "タスク1";
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isNextPomodoro, setIsNextPomodoro] = useState(false);
  const [restCount, setRestCount] = useState(INIT_REST_COUNT);

  const toggleTimerState = () => {
    setIsActive((prev) => !prev);
  };

  const skipRest = () => {
    setTime(0);
  };

  const resetTimer = () => {
    setTime(POMODORO_TIME);
  };

  useEffect(() => {
    if (!isActive) return;

    const intervalID = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      if (isNextPomodoro) {
        setTime(POMODORO_TIME);
      } else {
        setTime(restCount === 1 ? LONG_REST_TIME : SHORT_REST_TIME);
        setRestCount((prev) => (prev === 1 ? INIT_REST_COUNT : prev - 1));
      }
      setIsActive(false);
      setIsNextPomodoro((prev) => !prev);
    }
  }, [time, isNextPomodoro, restCount]);

  return (
    <div
      className={cn(s.container, {
        [s.colorInPomodoro]: !isNextPomodoro,
        [s.colorInRest]: isNextPomodoro,
      })}
    >
      <p className={s.timeText}>{formatTimerTime(time)}</p>
      <p className={s.labelText}>{taskTitle}</p>
      <div className={s.actionButtons}>
        {!isActive && (
          <>
            <button onClick={toggleTimerState} className={s.actionButton}>
              <div
                className={cn({
                  [s.actionButtonLayerInPomodoro]: !isNextPomodoro,
                  [s.actionButtonLayerInRest]: isNextPomodoro,
                })}
              />
              <PlayCircleIcon size={48} />
            </button>
            {![POMODORO_TIME, SHORT_REST_TIME, LONG_REST_TIME].includes(
              time
            ) && (
              <button onClick={resetTimer} className={s.actionButton}>
                <div className={s.actionButtonLayerInPomodoro} />
                <StopCircleIcon size={48} />
              </button>
            )}
          </>
        )}
        {isActive &&
          (isNextPomodoro ? (
            <button onClick={skipRest} className={s.actionButton}>
              <div className={s.actionButtonLayerInRest} />
              <CheckCircleIcon size={48} />
            </button>
          ) : (
            <button onClick={toggleTimerState} className={s.actionButton}>
              <div className={s.actionButtonLayerInPomodoro} />
              <PauseCircleIcon size={48} />
            </button>
          ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
