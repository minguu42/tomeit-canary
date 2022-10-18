import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isDrawerOpen = atom({
  key: "isDrawerOpen",
  default: false,
});

export const useIsDrawerOpenAtom = (): boolean => useRecoilValue(isDrawerOpen);

type IsDrawerOpenMutators = {
  toggleDrawer: () => void;
};

export const useIsDrawerOpenMutators = (): IsDrawerOpenMutators => {
  const setIsDrawerOpen = useSetRecoilState(isDrawerOpen);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, [setIsDrawerOpen]);

  return { toggleDrawer };
};
