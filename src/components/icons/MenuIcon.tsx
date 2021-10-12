type Props = {
  size?: number;
  fill?: string;
};

const MenuIcon = ({ size, fill }: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size ?? "24px"}
    viewBox="0 0 24 24"
    width={size ?? "24px"}
    fill={fill ?? "#000000"}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export default MenuIcon;
