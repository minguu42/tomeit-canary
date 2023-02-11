import React from "react";

import { useIsDarkTheme } from "@/features/theme/useIsDarkTheme";
import { darkTheme, lightTheme } from "@/styles/tokens.css";
import { useTheme } from "./Theme.hooks";

type Props = {
  children: React.ReactNode;
};

export const Theme: React.FC<Props> = ({ children }) => {
  const isLoading = useTheme();
  const isDarkTheme = useIsDarkTheme();

  return isLoading ? <></> : <div className={isDarkTheme ? darkTheme : lightTheme}>{children}</div>;
};
