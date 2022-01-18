import { VFC } from "react";

type Props = {
  size?: number;
  className?: string;
};

const Done: VFC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? "24px"}
    height={size ?? "24px"}
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

export default Done;
