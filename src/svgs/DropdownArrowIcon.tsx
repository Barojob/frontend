import React from "react";

type DropdownArrowIconProps = {
  className?: string;
  size?: number;
};

const DropdownArrowIcon: React.FC<DropdownArrowIconProps> = ({
  className = "",
  size = 12,
}) => {
  return (
    <svg
      width={size}
      height={Math.round(size * (10 / 12))}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.86603 9.5C6.48113 10.1667 5.51887 10.1667 5.13397 9.5L0.803848 2C0.418948 1.33333 0.900074 0.499999 1.66987 0.499999L10.3301 0.5C11.0999 0.5 11.5811 1.33333 11.1962 2L6.86603 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DropdownArrowIcon;
