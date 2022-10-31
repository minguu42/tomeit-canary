import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const Remove: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="M5 13v-2h14v2Z" />
  </svg>
);

export default Remove;
