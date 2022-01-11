import type { VFC } from "react";

type Props = {
  size?: number;
  className?: string;
};

const StopCircle: VFC<Props> = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    width={size ?? "24px"}
    height={size ?? "24px"}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <rect fill="none" height="24" width="24" />
    <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8s3.58-8,8-8 s8,3.58,8,8S16.42,20,12,20z M16,16H8V8h8V16z" />
  </svg>
);

export default StopCircle;