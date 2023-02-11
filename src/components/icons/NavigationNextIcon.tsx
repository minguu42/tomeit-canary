import React from "react";

export const NavigateNextIcon: React.FC<React.ComponentPropsWithoutRef<"svg">> = ({
  width = 24,
  height = 24,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="currentColor"
    className={className}
  >
    <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" />
  </svg>
);
