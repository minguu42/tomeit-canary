import { FC } from "react";

type Props = {
  size?: 18 | 24;
};

const Menu: FC<Props> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
  >
    <path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z" />
  </svg>
);

export default Menu;
