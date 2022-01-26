import { useCallback, useEffect } from "react";

import { ThemeAtom, useThemeMutators } from "@/globalStates/themeAtom";

const THEME_ATTRIBUTE_NAME = "data-theme";
const THEME_LOCAL_STORAGE_KEY = "theme";

export const useTheme = () => {
  const { setTheme } = useThemeMutators();

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.getAttribute(THEME_ATTRIBUTE_NAME);
    setTheme(initialColorValue as ThemeAtom);
  }, [setTheme]);
};

export const useThemeActions = () => {
  const { setTheme } = useThemeMutators();

  const toggleTheme = useCallback(
    (theme: ThemeAtom) => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      const root = window.document.documentElement;
      root.setAttribute(THEME_ATTRIBUTE_NAME, newTheme);
      window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
    },
    [setTheme]
  );

  return { toggleTheme };
};
