import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  isChecked: boolean;
  onToggle: () => void;
  label: string;
};

const CircleCheckBox: React.FC<Props> = ({
  className,
  isChecked,
  onToggle,
  label,
}) => {
  return (
    <div
      className="w-full flex flex-row items-center font-normal"
      onClick={onToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn(
          "size-7 transition-all duration-200 cursor-pointer",
          className
        )}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          className={cn(
            "duration-200",
            isChecked ? "fill-extraBlack-1" : "fill-gray-300"
          )}
        />
        <path
          d="M7.5 12L10.5 15L16.5 9"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className={cn(
          "text-base ml-2 duration-200",
          isChecked ? "text-black-1" : "text-gray-400"
        )}
      >
        {label}
      </div>{" "}
    </div>
  );
};

export default CircleCheckBox;
