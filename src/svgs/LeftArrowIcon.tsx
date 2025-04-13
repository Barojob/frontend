import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
  onClick?: () => void;
  onTouchStart?: () => void;
};

const LeftArrowIcon: React.FC<Props> = ({
  className,
  onClick,
  onTouchStart,
}) => {
  return (
    <button onClick={onClick} onTouchStart={onTouchStart}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        className={cn("size-6 stroke-gray-600", className)}
      >
        <path
          fillRule="evenodd"
          d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default LeftArrowIcon;
