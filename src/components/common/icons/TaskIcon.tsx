import { FC } from "react";

type Props = {
  size?: 18 | 24;
  className?: string;
};

export const TaskIcon: FC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
    className={className}
  >
    <path d="m10.95 18 5.65-5.65-1.45-1.45-4.225 4.225-2.1-2.1L7.4 14.45ZM6 22q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h8l6 6v12q0 .825-.587 1.413Q18.825 22 18 22Zm7-13V4H6v16h12V9ZM6 4v5-5 16V4Z" />
  </svg>
);
