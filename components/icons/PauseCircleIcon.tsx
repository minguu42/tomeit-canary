import { VFC } from "react";

type Props = {
  size?: number;
  fill?: string;
};

const PauseCircleIcon: VFC<Props> = ({ size, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height={size ?? 24}
    viewBox="0 0 24 24"
    width={size ?? 24}
    fill={fill ?? "#000000"}
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M9,16h2V8H9V16z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M13,16h2V8h-2V16z" />
      </g>
    </g>
  </svg>
);

export default PauseCircleIcon;
