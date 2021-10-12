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
