import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type ThemeAtom = "light" | "dark";

type ThemeMutators = {
  setTheme: (theme: ThemeAtom) => void;
};

const themeAtom = atom<ThemeAtom>({
  key: "themeAtom",
  default: "light",
});

export const useThemeAtom = (): ThemeAtom => useRecoilValue(themeAtom);

export const useThemeMutators = (): ThemeMutators => {
  const setAtom = useSetRecoilState(themeAtom);

  const setTheme = useCallback(
    (theme: ThemeAtom) => {
      setAtom(theme);
    },
    [setAtom]
  );

  return { setTheme };
};
