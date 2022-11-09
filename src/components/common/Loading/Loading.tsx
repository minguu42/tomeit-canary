import { FC } from "react";

import * as s from "./Loading.css";

export const Loading: FC = () => {
  return (
    <div className={s.background}>
      <h1 className={s.message}>Loading ...</h1>
    </div>
  );
};
