import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isDrawerOpenState = atom({
  key: "isDrawerOpenState",
  default: false,
});

export const useIsDrawerOpen = (): boolean => {
  return useRecoilValue(isDrawerOpenState);
};

type IsDrawerOpenActions = {
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useIsDrawerOpenActions = (): IsDrawerOpenActions => {
  const setIsDrawerOpen = useSetRecoilState(isDrawerOpenState);

  const closeDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  const toggleDrawer = (): void => {
    setIsDrawerOpen((prev) => !prev);
  };

  return {
    closeDrawer,
    toggleDrawer,
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
