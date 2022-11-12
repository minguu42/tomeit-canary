import { FC } from "react";

type Props = {
  size?: 18 | 24;
  className?: string;
};

export const AddIcon: FC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
    className={className}
  >
    <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
  </svg>
);
