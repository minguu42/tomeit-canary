import { useEffect } from "react";
import { Theme, useSetTheme } from "@/lib/theme";

const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
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
})()`,
    }}
  />
);

type Props = {
  children: JSX.Element;
};

const ThemeProvider = ({ children }: Props): JSX.Element => {
  const setTheme = useSetTheme();

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

export default ThemeProvider;
