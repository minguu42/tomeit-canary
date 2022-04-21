import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isNavigationDrawerOpenAtom = atom({
  key: "isNavigationDrawerOpenAtom",
  default: false,
});

export const useIsNavigationDrawerOpenAtom = (): boolean =>
  useRecoilValue(isNavigationDrawerOpenAtom);

type IsNavigationDrawerOpenMutators = {
  toggleNavigationDrawer: () => void;
};

export const useIsNavigationDrawerOpenMutators =
  (): IsNavigationDrawerOpenMutators => {
    const setAtom = useSetRecoilState(isNavigationDrawerOpenAtom);

    const toggleNavigationDrawer = useCallback(() => {
      setAtom((prev) => !prev);
    }, [setAtom]);

    return { toggleNavigationDrawer };
  };
