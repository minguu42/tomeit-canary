import { FC } from "react";

type Props = {
  size?: 18;
};

export const Timer: FC<Props> = ({ size }) => {
  if (size === 18) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        width="18"
        viewBox="0 0 20 20"
      >
        <path d="M7.5 3V1.5h5V3Zm1.75 9h1.5V7h-1.5Zm.75 6q-1.458 0-2.729-.552-1.271-.552-2.219-1.5t-1.5-2.219Q3 12.458 3 11q0-1.458.552-2.729.552-1.271 1.5-2.219t2.219-1.5Q8.542 4 10 4q1.208 0 2.323.406t2.073 1.136l1.083-1.063 1.042 1.042-1.063 1.083q.73.938 1.136 2.063Q17 9.792 17 11q0 1.458-.552 2.729-.552 1.271-1.5 2.219t-2.219 1.5Q11.458 18 10 18Zm0-1.5q2.292 0 3.896-1.604T15.5 11q0-2.292-1.604-3.896T10 5.5q-2.292 0-3.896 1.604T4.5 11q0 2.292 1.604 3.896T10 16.5Zm0-5.5Z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path d="M9 3V1h6v2Zm2 11h2V8h-2Zm1 8q-1.85 0-3.488-.712-1.637-.713-2.862-1.938t-1.938-2.862Q3 14.85 3 13t.712-3.488Q4.425 7.875 5.65 6.65t2.862-1.937Q10.15 4 12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4 1.4 1.4-1.4 1.4Q20 8.6 20.5 10.025 21 11.45 21 13q0 1.85-.712 3.488-.713 1.637-1.938 2.862t-2.862 1.938Q13.85 22 12 22Zm0-2q2.9 0 4.95-2.05Q19 15.9 19 13q0-2.9-2.05-4.95Q14.9 6 12 6 9.1 6 7.05 8.05 5 10.1 5 13q0 2.9 2.05 4.95Q9.1 20 12 20Zm0-7Z" />
    </svg>
  );
};

export default Timer;
