import { FC } from "react";

type Props = {
  className?: string;
};

const Logout: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    className={className}
  >
    <path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z" />
  </svg>
);

export default Logout;
