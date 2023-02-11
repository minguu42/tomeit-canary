import React from "react";

import { Header } from "@/features/layouts/Header";
import * as s from "./Layout.css";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.background}>
      <Header />
      {children}
    </div>
  );
};
