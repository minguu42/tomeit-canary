import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const NavigateBefore: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" />
  </svg>
);

export default NavigateBefore;
