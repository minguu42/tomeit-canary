import { FC } from "react";

import { darkTheme, lightTheme } from "@/styles/tokens/theme.css";

type Props = {
  children: JSX.Element;
};

const Theme: FC<Props> = ({ children }) => {
  return (
    <>
      <div id="#theme">{children}</div>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(){let e;const t=window.localStorage.getItem("theme");if(null!==t)e=t;else{e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.getElementById("#theme").className=e==="light"?"${lightTheme}":"${darkTheme}";console.log("once")}();`,
        }}
      />
    </>
  );
};

export default Theme;
