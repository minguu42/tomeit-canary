import { FC } from "react";

type Props = {
  className?: string;
};

const Menu: FC<Props> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={className}>
    <path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z" />
  </svg>
);

export default Menu;
