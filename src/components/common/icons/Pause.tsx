import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const Pause: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="M14 19V5h4v14Zm-8 0V5h4v14Z" />
  </svg>
);

export default Pause;
