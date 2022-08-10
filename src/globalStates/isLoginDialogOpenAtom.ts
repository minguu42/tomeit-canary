import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isLoginDialogOpenAtom = atom({
  key: "isLoginDialogOpenAtom",
  default: false,
});

export const useIsLoginDialogOpenAtom = (): boolean =>
  useRecoilValue(isLoginDialogOpenAtom);

type IsLoginDialogOpenMutators = {
  toggleLoginDialog: () => void;
};

export const useIsLoginDialogOpenMutators = (): IsLoginDialogOpenMutators => {
  const setAtom = useSetRecoilState(isLoginDialogOpenAtom);

  const toggleLoginDialog = useCallback(() => {
    setAtom((prev) => !prev);
  }, [setAtom]);

  return { toggleLoginDialog };
};
