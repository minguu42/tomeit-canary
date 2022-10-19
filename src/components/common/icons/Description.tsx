import { FC } from "react";

type Props = {
  size?: 18;
};

const Description: FC<Props> = ({ size }) => {
  if (size === 18) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20">
        <path d="M7 15h6v-1.5H7Zm0-3h6v-1.5H7Zm-1.5 6q-.625 0-1.062-.438Q4 17.125 4 16.5v-13q0-.625.438-1.062Q4.875 2 5.5 2H12l4 4v10.5q0 .625-.438 1.062Q15.125 18 14.5 18ZM11 7V3.5H5.5v13h9V7ZM5.5 3.5v3.938V3.5v13-13Z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path d="M8 18h8v-2H8Zm0-4h8v-2H8Zm-2 8q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h8l6 6v12q0 .825-.587 1.413Q18.825 22 18 22Zm7-13V4H6v16h12V9ZM6 4v5-5 16V4Z" />
    </svg>
  );
};

export default Description;
