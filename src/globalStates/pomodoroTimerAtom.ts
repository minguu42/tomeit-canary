import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { Task } from "@/models/task";
import {POMODORO_TIME, SHORT_REST_TIME, LONG_REST_TIME, INIT_REST_COUNT} from "@/models/pomodoro";

type PomodoroTimerAtom = {
  time: number;
  isActive: boolean;
  isNextPomodoro: boolean;
  restCount: number;
  playingTask: Task | null;
};

const pomodoroTimerAtom = atom<PomodoroTimerAtom>({
  key: "pomodoroTimerAtom",
  default: {
    time: POMODORO_TIME,
    isActive: false,
    isNextPomodoro: false,
    restCount: INIT_REST_COUNT,
    playingTask: null,
  },
});

export const usePomodoroTimerAtom = (): PomodoroTimerAtom =>
  useRecoilValue(pomodoroTimerAtom);

type PomodoroTimerMutators = {
  playPomodoro: (task: Task) => void;
  stopPomodoroTimer: () => void;
  skipRestTime: () => void;
  resetPomodoro: () => void;
  setPlayingTask: (task: Task) => void;
  unsetPlayingTask: () => void;
  tickTime: () => void;
  updatePomodoroTimerWhenTimeEnd: () => void;
};

export const usePomodoroTimerMutators = (): PomodoroTimerMutators => {
  const setAtom = useSetRecoilState(pomodoroTimerAtom);

  const playPomodoro = (task: Task) => {
    setAtom((prev) => {
      return { ...prev, isActive: true, playingTask: task };
    });
  };

  const stopPomodoroTimer = () => {
    setAtom((prev) => {
      return { ...prev, isActive: false };
    });
  };

  const updatePomodoroTimerWhenTimeEnd = () => {
    setAtom((prev) => {
      let nextTime;
      let nextRestCount;
      if (prev.isNextPomodoro) {
        nextTime = POMODORO_TIME;
        nextRestCount = prev.restCount;
      } else {
        nextTime = prev.restCount === 1 ? LONG_REST_TIME : SHORT_REST_TIME;
        nextRestCount =
          prev.restCount === 1 ? INIT_REST_COUNT : prev.restCount - 1;
      }

      return {
        time: nextTime,
        isActive: false,
        restCount: nextRestCount,
        isNextPomodoro: !prev.isNextPomodoro,
        playingTask: prev.playingTask,
      };
    });
  };

  const skipRestTime = () => {
    setAtom((prev) => {
      return { ...prev, time: 0 };
    });
  };

  const resetPomodoro = () => {
    setAtom((prev) => {
      return { ...prev, time: POMODORO_TIME };
    });
  };

  const setPlayingTask = (task: Task) => {
    setAtom((prev) => {
      return { ...prev, playingTask: task };
    });
  };

  const unsetPlayingTask = (): void => {
    setAtom((prev) => {
      return { ...prev, playingTask: null };
    });
  };

  const tickTime = () => {
    setAtom((prev) => {
      return { ...prev, time: prev.time - 1 };
    });
  };

  return {
    playPomodoro,
    stopPomodoroTimer,
    skipRestTime,
    resetPomodoro,
    setPlayingTask,
    unsetPlayingTask,
    tickTime,
    updatePomodoroTimerWhenTimeEnd,
  };
};
