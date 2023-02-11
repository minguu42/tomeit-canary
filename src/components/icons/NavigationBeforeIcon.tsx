import React from "react";

export const NavigateBeforeIcon: React.FC<React.ComponentPropsWithoutRef<"svg">> = ({
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
    <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" />
  </svg>
);
