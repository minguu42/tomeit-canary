import { FC, useState } from "react";

import { darkTheme, lightTheme } from "@/styles/theme.css";

type Props = {
  children: JSX.Element;
};

const Theme: FC<Props> = ({ children }) => {
  const [isDarkTheme] = useState(false);

  return <div className={isDarkTheme ? darkTheme : lightTheme}>{children}</div>;
};

export default Theme;
