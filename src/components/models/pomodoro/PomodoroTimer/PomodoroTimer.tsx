import { FC, useEffect } from "react";
import cn from "classnames";

import {
  CheckCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@/components/common/icons";
import s from "./PomodoroTimer.module.css";
import {
  LONG_REST_TIME,
  POMODORO_TIME,
  SHORT_REST_TIME,
  usePomodoroTimerActions,
  usePomodoroTimerAtom,
} from "@/globalStates/pomodoroTimerAtom";
import { useTasksMutators } from "@/globalStates/tasksAtom";
import { formatTimerTime } from "@/lib/format";
import { Task } from "@/models/task";

const PomodoroTimer: FC = () => {
  const { time, isActive, isNextPomodoro, playingTask } =
    usePomodoroTimerAtom();
  const {
    stopPomodoroTimer,
    skipRestTime,
    resetPomodoro,
    playPomodoro,
    setPlayingTask,
    updatePomodoroTimerWhenTimeEnd,
    tickTime,
  } = usePomodoroTimerActions();
  const { replaceTask } = useTasksMutators();

  useEffect(() => {
    if (!isActive) return;

    const intervalID = setInterval(() => {
      tickTime();
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isActive, tickTime]);

  useEffect(() => {
    if (time === 0) {
      if (!isNextPomodoro && playingTask !== null) {
        const newTask: Task = {
          ...playingTask,
          completedPomoNum: playingTask.completedPomoNum + 1,
        };
        replaceTask(playingTask, newTask);
        setPlayingTask(newTask);
      }
      updatePomodoroTimerWhenTimeEnd();
    }
  }, [
    isNextPomodoro,
    playingTask,
    replaceTask,
    setPlayingTask,
    time,
    updatePomodoroTimerWhenTimeEnd,
  ]);

  const isNotStartPomodoroTimer =
    !isActive &&
    [POMODORO_TIME, SHORT_REST_TIME, LONG_REST_TIME].includes(time);
  const isStoppingPomodoroTimer =
    !isActive &&
    ![POMODORO_TIME, SHORT_REST_TIME, LONG_REST_TIME].includes(time);
  const isPlayingPomodoro = isActive && !isNextPomodoro;
  const isDuringRest = isActive && isNextPomodoro;

  return (
    <div
      className={cn(s.container, {
        [s.colorInPomodoro]: !isNextPomodoro,
        [s.colorInRest]: isNextPomodoro,
      })}
    >
      <p className={s.timeText}>{formatTimerTime(time)}</p>
      <p className={s.labelText}>{playingTask !== null && playingTask.title}</p>
      <div className={s.actionButtons}>
        {isNotStartPomodoroTimer && (
          <button
            onClick={
              playingTask === null
                ? undefined
                : () => {
                    playPomodoro(playingTask);
                  }
            }
            aria-label="ポモドーロを開始する"
            disabled={playingTask === null}
            className={s.actionButton}
          >
            <div
              className={cn({
                [s.actionButtonLayerInPomodoro]: !isNextPomodoro,
                [s.actionButtonLayerInRest]: isNextPomodoro,
              })}
            />
            <PlayCircleIcon size={48} />
          </button>
        )}
        {isStoppingPomodoroTimer && (
          <>
            <button
              onClick={
                playingTask === null
                  ? undefined
                  : () => {
                      playPomodoro(playingTask);
                    }
              }
              aria-label="ポモドーロを開始する"
              disabled={playingTask === null}
              className={s.actionButton}
            >
              <div
                className={cn({
                  [s.actionButtonLayerInPomodoro]: !isNextPomodoro,
                  [s.actionButtonLayerInRest]: isNextPomodoro,
                })}
              />
              <PlayCircleIcon size={48} />
            </button>
            <button
              onClick={resetPomodoro}
              aria-label="ポモドーロを中止する"
              className={s.actionButton}
            >
              <div className={s.actionButtonLayerInPomodoro} />
              <StopCircleIcon size={48} />
            </button>
          </>
        )}
        {isPlayingPomodoro && (
          <button
            onClick={stopPomodoroTimer}
            aria-label="タイマーを停止する"
            className={s.actionButton}
          >
            <div className={s.actionButtonLayerInPomodoro} />
            <PauseCircleIcon size={48} />
          </button>
        )}
        {isDuringRest && (
          <button
            onClick={skipRestTime}
            aria-label="休憩をスキップする"
            className={s.actionButton}
          >
            <div className={s.actionButtonLayerInRest} />
            <CheckCircleIcon size={48} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
