import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const navigationDrawerAtom = atom({
  key: "navigationDrawerAtom",
  default: false,
});

export const useNavigationDrawerAtom = (): boolean => {
  return useRecoilValue(navigationDrawerAtom);
};

export const useToggleNavigationDrawer = () => {
  const setNavigationDrawer = useSetRecoilState(navigationDrawerAtom);

  return () => {
    setNavigationDrawer((prev) => !prev);
  };
};
