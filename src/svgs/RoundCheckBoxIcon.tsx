import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const RoundCheckBoxIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M8.5 12L11 15L16.5 9"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RoundCheckBoxIcon;
