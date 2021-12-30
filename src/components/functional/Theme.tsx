import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

export type Theme = "light" | "dark";

const themeState = atom<Theme>({
  key: "themeState",
  default: "light",
});

const ThemeScript = () => {
  const codeToRunOnClient = `
(function() {
  function getTheme() {
    const storageTheme = window.localStorage.getItem("theme");
    if (storageTheme !== null) {
      return storageTheme;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    return mql.matches ? "dark" : "light";
  }

  const theme = getTheme();
  const root = document.documentElement;

  root.setAttribute("data-theme", theme);
})()`;
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

type Props = {
  children: JSX.Element;
};

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const setTheme = useSetRecoilState(themeState);

  useEffect(() => {
    const root = window.document.documentElement;

    const initialColorValue = root.getAttribute("data-theme");
    setTheme(initialColorValue as Theme);
  }, [setTheme]);

  return (
    <>
      <ThemeScript />
      {children}
    </>
  );
};

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    const root = window.document.documentElement;

    if (newTheme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  };

  return { theme, toggleTheme };
};
