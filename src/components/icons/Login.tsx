import { FC } from "react";

type Props = {
  className?: string;
};

const Login: FC<Props> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={className}>
    <path d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm-2-4-1.375-1.45 2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5Z" />
  </svg>
);

export default Login;
