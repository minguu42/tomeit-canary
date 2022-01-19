import { useEffect, VFC } from "react";
import cn from "classnames";

import {
  CheckCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@/components/common/icons";
import s from "./PomodoroTimer.module.css";
import {
  usePomodoroTimerActions,
  usePomodoroTimerAtom,
  POMODORO_TIME,
  SHORT_REST_TIME,
  LONG_REST_TIME,
} from "@/globalStates/pomodoroTimerAtom";
import { Task } from "@/models/task";
import { formatTimerTime } from "@/lib/format";

type Props = {
  playingTask: Task | null;
  completePomodoro: () => void;
};

const PomodoroTimer: VFC<Props> = ({ playingTask, completePomodoro }) => {
  const { time, isActive, isNextPomodoro } = usePomodoroTimerAtom();
  const {
    startPomodoroTimer,
    stopPomodoroTimer,
    skipRestTime,
    resetPomodoro,
    updatePomodoroTimerWhenTimeEnd,
  } = usePomodoroTimerActions();

  useEffect(() => {
    if (time === 0) {
      if (!isNextPomodoro) {
        completePomodoro();
      }
      updatePomodoroTimerWhenTimeEnd();
    }
  }, [completePomodoro, isNextPomodoro, time, updatePomodoroTimerWhenTimeEnd]);

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
        {!isActive && (
          <>
            <button
              onClick={startPomodoroTimer}
              aria-label="ポモドーロを開始する"
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
            {![POMODORO_TIME, SHORT_REST_TIME, LONG_REST_TIME].includes(
              time
            ) && (
              <button
                onClick={resetPomodoro}
                aria-label="ポモドーロを中止する"
                className={s.actionButton}
              >
                <div className={s.actionButtonLayerInPomodoro} />
                <StopCircleIcon size={48} />
              </button>
            )}
          </>
        )}
        {isActive &&
          (isNextPomodoro ? (
            <button
              onClick={skipRestTime}
              aria-label="休憩をスキップする"
              className={s.actionButton}
            >
              <div className={s.actionButtonLayerInRest} />
              <CheckCircleIcon size={48} />
            </button>
          ) : (
            <button
              onClick={stopPomodoroTimer}
              aria-label="タイマーを停止する"
              className={s.actionButton}
            >
              <div className={s.actionButtonLayerInPomodoro} />
              <PauseCircleIcon size={48} />
            </button>
          ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
