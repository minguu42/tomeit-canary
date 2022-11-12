import { FC } from "react";

type Props = {
  size?: 18 | 24;
  className?: string;
};

export const StopIcon: FC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
    className={className}
  >
    <path d="M8 8v8ZM6 18V6h12v12Zm2-2h8V8H8Z" />
  </svg>
);
