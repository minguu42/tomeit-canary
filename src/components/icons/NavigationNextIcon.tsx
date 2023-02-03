type Props = {
  size?: 18 | 24;
  className?: string;
};

export const NavigateNextIcon = ({ size, className }: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill="currentColor"
    className={className}
  >
    <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" />
  </svg>
);
