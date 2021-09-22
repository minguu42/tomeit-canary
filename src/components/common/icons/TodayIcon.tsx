type Props = {
  size?: number;
  fill?: string;
};

const TodayIcon = ({ size, fill }: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size ?? "24px"}
    viewBox="0 0 24 24"
    width={size ?? "24px"}
    fill={fill ?? "#000000"}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z" />
  </svg>
);

export default TodayIcon;
