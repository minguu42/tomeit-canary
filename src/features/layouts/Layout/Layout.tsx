import type { ReactNode } from "react";

import { Header } from "@/features/layouts/Header";
import * as s from "./Layout.css";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={s.background}>
      <Header />
      {children}
    </div>
  );
};
