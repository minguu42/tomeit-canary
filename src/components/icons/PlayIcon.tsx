import React from "react";

export const PlayIcon: React.FC<React.ComponentPropsWithoutRef<"svg">> = ({
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
    <path d="M8 19V5l11 7Zm2-7Zm0 3.35L15.25 12 10 8.65Z" />
  </svg>
);
