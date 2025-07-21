import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const WarningIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="103"
        height="103"
        viewBox="0 0 103 103"
        fill="none"
      >
        <path
          d="M46.3039 8.99999C48.6133 4.99999 54.3868 5 56.6962 9L90.9042 68.25C93.2136 72.25 90.3268 77.25 85.708 77.25H17.292C12.6732 77.25 9.78644 72.25 12.0958 68.25L46.3039 8.99999Z"
          fill="#C5D6EF"
        />
        <path
          d="M51 31L51 50"
          stroke="#247AF2"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="51" cy="62" r="4" fill="#247AF2" />
      </svg>
    </div>
  );
};
export default WarningIcon;
