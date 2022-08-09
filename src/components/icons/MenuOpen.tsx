import { FC } from "react";

type Props = {
  className?: string;
};

const MenuOpen: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    className={className}
  >
    <path d="M3 18v-2h13v2Zm16.6-1-5-5 5-5L21 8.4 17.4 12l3.6 3.6ZM3 13v-2h10v2Zm0-5V6h13v2Z" />
  </svg>
);

export default MenuOpen;