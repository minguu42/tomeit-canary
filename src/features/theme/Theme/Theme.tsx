import { ReactNode } from "react";

import { useIsDarkTheme } from "@/features/theme/useIsDarkTheme";
import { darkTheme, lightTheme } from "@/styles/tokens.css";
import { useTheme } from "./Theme.hooks";

type Props = {
  children: ReactNode;
};

export const Theme = ({ children }: Props): JSX.Element => {
  const isLoading = useTheme();
  const isDarkTheme = useIsDarkTheme();

  return isLoading ? <></> : <div className={isDarkTheme ? darkTheme : lightTheme}>{children}</div>;
};
