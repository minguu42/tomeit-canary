import { useEffect, useState } from "react";

import { useIsDarkThemeMutators } from "@/globalStates/isDarkTheme";

export const useTheme = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsDarkTheme } = useIsDarkThemeMutators();

  useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    if (theme === null) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setIsDarkTheme(theme === "dark");
    setIsLoading(false);
  }, [setIsDarkTheme]);

  return isLoading;
};
