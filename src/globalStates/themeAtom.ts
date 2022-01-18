import { atom, useRecoilState, useSetRecoilState } from "recoil";

export type ThemeAtom = "light" | "dark";

export const THEME_ATTRIBUTE_NAME = "data-theme";
const THEME_LOCAL_STORAGE_KEY = "theme";

const themeAtom = atom<ThemeAtom>({
  key: "themeAtom",
  default: "light",
});

export const useSetThemeAtom = () => {
  return useSetRecoilState(themeAtom);
};

export const useThemeAtom = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    const root = window.document.documentElement;
    root.setAttribute(THEME_ATTRIBUTE_NAME, newTheme);
    window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
  };

  return { theme, toggleTheme };
};
