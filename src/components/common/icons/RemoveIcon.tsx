import { FC } from "react";

type Props = {
  size?: 18 | 24;
  className?: string;
};

export const RemoveIcon: FC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
    className={className}
  >
    <path d="M5 13v-2h14v2Z" />
  </svg>
);
