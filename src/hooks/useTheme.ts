import { useCallback } from "react";
import { darkTheme, lightTheme } from "@/styles/tokens/theme.css";

type UseTheme = {
  isDarkTheme: boolean;
  toggleTheme: () => void
}

export const useTheme = (): UseTheme => {
  const themeElement = window.document.getElementById("#theme");
  const isDarkTheme = themeElement?.className === darkTheme

  const toggleTheme = useCallback(() => {
    const themeElement = window.document.getElementById("#theme");
    if (themeElement === null) return;
    const isDarkTheme = themeElement.className === darkTheme
    window.localStorage.setItem("theme", isDarkTheme ? "light" : "dark")
    themeElement.className = isDarkTheme ? lightTheme : darkTheme;
  }, []);

  return { isDarkTheme, toggleTheme };
};
