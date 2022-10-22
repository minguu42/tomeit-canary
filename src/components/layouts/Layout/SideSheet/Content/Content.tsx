import { FC } from "react";

import * as s from "./Content.css";

type Props = {
  leadingIcon: JSX.Element;
  name: string;
  value: string;
};

const Content: FC<Props> = ({ leadingIcon, name, value }) => (
  <div className={s.container}>
    {leadingIcon}
    <p className={s.name}>{name}</p>
    <p>{value}</p>
  </div>
);

export default Content;
