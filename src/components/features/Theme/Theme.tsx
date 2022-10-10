import { FC } from "react";

import { darkTheme, lightTheme } from "@/styles/tokens/theme.css";
import { useIsDarkTheme } from "@/globalStates/isDarkTheme";
import { useTheme } from "./Theme.hooks";

type Props = {
  children: JSX.Element;
};

const Theme: FC<Props> = ({ children }) => {
  const isLoading = useTheme();
  const isDarkTheme = useIsDarkTheme();

  return isLoading ? (
    <></>
  ) : (
    <div className={isDarkTheme ? darkTheme : lightTheme}>{children}</div>
  );
};

export default Theme;
