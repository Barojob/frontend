import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  onTouchStart?: () => void;
};

const RightArrowIcon: React.FC<Props> = ({
  className,
  onClick,
  onTouchStart,
}) => {
  return (
    <button onClick={onClick} onTouchStart={onTouchStart}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="13"
        viewBox="0 0 7 13"
        className={cn("fill-none", className)}
      >
        <path
          d="M0.525429 12.9999C0.391076 12.9999 0.256723 12.9469 0.154209 12.8404C-0.0508197 12.6274 -0.0508197 12.2825 0.154209 12.0695L5.51538 6.50048L0.153509 0.930716C-0.0511696 0.717738 -0.0511696 0.372467 0.153509 0.159489C0.358537 -0.0534886 0.690921 -0.0534886 0.895599 0.159489L6.99956 6.50012L0.896299 12.8404C0.793785 12.9469 0.659432 12.9999 0.525079 12.9999H0.525429Z"
          fill="#6B7684"
        />
      </svg>
    </button>
  );
};

export default RightArrowIcon;
