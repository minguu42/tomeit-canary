import { FC } from "react";

import { useTheme } from "@/components/features/Theme";

type Props = {
  children: JSX.Element;
};

const Theme: FC<Props> = ({ children }) => {
  useTheme();

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
