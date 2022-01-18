import { VFC, useEffect } from "react";

import {
  THEME_ATTRIBUTE_NAME,
  ThemeAtom,
  useSetThemeAtom,
} from "@/globalStates/themeAtom";

type Props = {
  children: JSX.Element;
};

const Theme: VFC<Props> = ({ children }) => {
  const setTheme = useSetThemeAtom();

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.getAttribute(THEME_ATTRIBUTE_NAME);
    setTheme(initialColorValue as ThemeAtom);
  }, [setTheme]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(){let e;const t=window.localStorage.getItem("theme");if(null!==t)e=t;else{e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",e)}();`,
        }}
      />
      {children}
    </>
  );
};

export default Theme;
