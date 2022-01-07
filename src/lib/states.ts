import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const navigationDrawerState = atom({
  key: "navigationDrawerState",
  default: false,
});

export const useIsNavigationDrawerOpen = (): boolean => {
  return useRecoilValue(navigationDrawerState);
};

export const useToggleNavigationDrawer = () => {
  const setIsOpen = useSetRecoilState(navigationDrawerState);
  return () => {
    setIsOpen((prev) => !prev);
  };
};
