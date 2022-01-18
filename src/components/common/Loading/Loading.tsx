import { VFC } from "react";

import s from "./Loading.module.css";

const Loading: VFC = () => {
  return (
    <div className={s.background}>
      <h1 className={s.message}>Loading ...</h1>
    </div>
  );
};

export default Loading;
