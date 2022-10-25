import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const PlayArrow: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="M8 19V5l11 7Zm2-7Zm0 3.35L15.25 12 10 8.65Z" />
  </svg>
);

export default PlayArrow;
