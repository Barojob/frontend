import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const MatchIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 12.5C6.125 12.5 5 13.625 5 15C5 16.375 6.125 17.5 7.5 17.5C8.875 17.5 10 16.375 10 15C10 13.625 8.875 12.5 7.5 12.5ZM22.5 12.5C21.125 12.5 20 13.625 20 15C20 16.375 21.125 17.5 22.5 17.5C23.875 17.5 25 16.375 25 15C25 13.625 23.875 12.5 22.5 12.5ZM15 12.5C13.625 12.5 12.5 13.625 12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5Z"
        className={cn("fill-[#B3B3B3]", className)}
      />
    </svg>
  );
};
export default MatchIcon;
