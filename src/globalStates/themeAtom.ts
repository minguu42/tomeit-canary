import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";

export type ThemeAtom = "light" | "dark";

const themeAtom = atom<ThemeAtom>({
  key: "themeAtom",
  default: "light",
});

export const useThemeAtom = (): ThemeAtom => useRecoilValue(themeAtom);

export const useThemeMutators = () => {
  const setAtom = useSetRecoilState(themeAtom);

  const setTheme = useCallback(
    (theme: ThemeAtom) => {
      setAtom(theme);
    },
    [setAtom]
  );

  return { setTheme };
};
