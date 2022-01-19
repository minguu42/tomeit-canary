import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isPomodoroTimerActiveAtom = atom({
  key: "isPomodoroTimerActiveAtom",
  default: false,
});

export const useIsPomodoroTimerActiveAtom = (): boolean =>
  useRecoilValue(isPomodoroTimerActiveAtom);

type IsPomodoroTimerActiveActions = {
  startPomodoroTimer: () => void;
  stopPomodoroTimer: () => void;
};

export const useIsPomodoroTimerActiveActions =
  (): IsPomodoroTimerActiveActions => {
    const setAtom = useSetRecoilState(isPomodoroTimerActiveAtom);

    const startPomodoroTimer = () => {
      setAtom(true);
    };

    const stopPomodoroTimer = () => {
      setAtom(false);
    };

    return { startPomodoroTimer, stopPomodoroTimer };
  };
