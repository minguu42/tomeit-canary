import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const SkipNext: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="M16.5 18V6h2v12Zm-11 0V6l9 6Zm2-6Zm0 2.25L10.9 12 7.5 9.75Z" />
  </svg>
);

export default SkipNext;
