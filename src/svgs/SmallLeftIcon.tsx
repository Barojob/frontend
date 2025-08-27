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
        viewBox="0 0 9 14"
        fill="none"
        className={cn("h-3.5 w-[9px] stroke-gray-600", className)}
      >
        <path
          d="M8 1L2 7L8 13"
          stroke="#6B7684"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default LeftArrowIcon;
