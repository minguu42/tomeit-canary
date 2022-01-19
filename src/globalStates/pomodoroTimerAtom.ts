import { useEffect } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const POMODORO_TIME = 15;
export const SHORT_REST_TIME = 300;
export const LONG_REST_TIME = 900;
const INIT_REST_COUNT = 4;

type PomodoroTimerAtom = {
  time: number;
  isActive: boolean;
  isNextPomodoro: boolean;
  restCount: number;
};

type PomodoroTimerActions = {
  startPomodoroTimer: () => void;
  stopPomodoroTimer: () => void;
  skipRestTime: () => void;
  resetPomodoro: () => void;
  updatePomodoroTimerWhenTimeEnd: () => void;
};

const pomodoroTimerAtom = atom<PomodoroTimerAtom>({
  key: "pomodoroTimerAtom",
  default: {
    time: POMODORO_TIME,
    isActive: false,
    isNextPomodoro: false,
    restCount: INIT_REST_COUNT,
  },
});

export const usePomodoroTimerAtom = (): PomodoroTimerAtom => {
  const [atom, setAtom] = useRecoilState(pomodoroTimerAtom);

  useEffect(() => {
    if (!atom.isActive) return;

    const intervalID = setInterval(() => {
      setAtom((prev) => {
        return { ...prev, time: prev.time - 1 };
      });
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [atom.isActive, setAtom]);

  return atom;
};

export const usePomodoroTimerActions = (): PomodoroTimerActions => {
  const setAtom = useSetRecoilState(pomodoroTimerAtom);

  const startPomodoroTimer = () => {
    setAtom((prev) => {
      return { ...prev, isActive: true };
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

  return {
    startPomodoroTimer,
    stopPomodoroTimer,
    skipRestTime,
    resetPomodoro,
    updatePomodoroTimerWhenTimeEnd,
  };
};
