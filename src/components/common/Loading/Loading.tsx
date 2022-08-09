import { FC } from "react";

import * as s from "./Loading.css";

const Loading: FC = () => {
  return (
    <div className={s.background}>
      <h1 className={s.message}>Loading ...</h1>
    </div>
  );
};

export default Loading;
