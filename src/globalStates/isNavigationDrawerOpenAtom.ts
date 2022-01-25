import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type IsNavigationDrawerOpenMutators = {
  toggleNavigationDrawer: () => void;
};

const isNavigationDrawerOpenAtom = atom({
  key: "isNavigationDrawerOpenAtom",
  default: false,
});

export const useIsNavigationDrawerOpenAtom = (): boolean =>
  useRecoilValue(isNavigationDrawerOpenAtom);

export const useIsNavigationDrawerOpenMutators =
  (): IsNavigationDrawerOpenMutators => {
    const setAtom = useSetRecoilState(isNavigationDrawerOpenAtom);

    const toggleNavigationDrawer = useCallback(() => {
      setAtom((prev) => !prev);
    }, [setAtom]);

    return { toggleNavigationDrawer };
  };
