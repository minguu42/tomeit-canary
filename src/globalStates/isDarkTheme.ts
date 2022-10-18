import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isDarkTheme = atom({
  key: "isDarkTheme",
  default: false,
});

export const useIsDarkTheme = (): boolean => useRecoilValue(isDarkTheme);

type IsDarkThemeMutators = {
  setIsDarkTheme: (isDarkTheme: boolean) => void;
  toggleTheme: () => void;
};

export const useIsDarkThemeMutators = (): IsDarkThemeMutators => {
  const setIsDarkTheme = useSetRecoilState(isDarkTheme);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => {
      window.localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  }, [setIsDarkTheme]);

  return { setIsDarkTheme, toggleTheme };
};
