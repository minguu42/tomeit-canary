type Props = {
  size?: number;
  fill?: string;
};

const TomorrowIcon = ({ size, fill }: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size ?? "24px"}
    viewBox="0 0 24 24"
    width={size ?? "24px"}
    fill={fill ?? "#000000"}
  >
    <path d="M13.3 13.6H7.2v1.8h6.1V18l3.5-3.5-3.5-3.5v2.6z" />
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </svg>
);

export default TomorrowIcon;
