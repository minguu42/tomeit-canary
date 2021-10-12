import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isDrawerOpenState = atom({
  key: "isDrawerOpenState",
  default: false,
});

export const useIsDrawerOpen = (): boolean => {
  return useRecoilValue(isDrawerOpenState);
};

export const useToggleDrawer = (): (() => void) => {
  const setIsDrawerOpen = useSetRecoilState(isDrawerOpenState);

  return (): void => {
    setIsDrawerOpen((prev) => !prev);
  };
};

export const useCloseDrawer = (): (() => void) => {
  const setIsDrawerOpen = useSetRecoilState(isDrawerOpenState);

  return (): void => {
    setIsDrawerOpen(false);
  };
};

const isPomodoroPlayingState = atom({
  key: "isPomodoroPlayingState",
  default: false,
});

export const useIsPomodoroPlaying = (): boolean => {
  return useRecoilValue(isPomodoroPlayingState);
};

type IsPomodoroPlayingActions = {
  startPlayingPomodoro: () => void;
  endPlayingPomodoro: () => void;
};

export const useIsPomodoroPlayingActions = (): IsPomodoroPlayingActions => {
  const setIsPomodoroPlaying = useSetRecoilState(isPomodoroPlayingState);

  const startPlayingPomodoro = (): void => {
    setIsPomodoroPlaying(true);
  };

  const endPlayingPomodoro = (): void => {
    setIsPomodoroPlaying(false);
  };

  return { startPlayingPomodoro, endPlayingPomodoro };
};
