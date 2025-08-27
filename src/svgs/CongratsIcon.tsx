import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
};

const CongratsIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="89"
        height="103"
        viewBox="0 0 89 103"
        fill="none"
      >
        <path
          d="M32.8165 81.7061C29.9667 83.4294 26.3822 81.1193 26.7744 77.8122L31.9785 33.934C32.3269 30.9972 35.6317 29.4408 38.1176 31.0429L70.7233 52.0564C73.2092 53.6585 73.157 57.311 70.6263 58.8414L32.8165 81.7061Z"
          fill="#C5D6EF"
        />
        <path
          d="M63.2594 63.3829L48.9738 71.8891L29.3518 59.8907L31.206 43.7843L63.2594 63.3829Z"
          fill="white"
        />
        <path
          d="M49.9463 16.0001L50.2904 26.1923"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M70.9997 15L63.3178 27.7156"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M79.8282 36.6585L69.9163 38.2167"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="81.4995" cy="25.5" r="2.5" fill="#D9D9D9" />
        <circle cx="37.4995" cy="15.5" r="2.5" fill="#D9D9D9" />
        <circle cx="60.4995" cy="2.5" r="2.5" fill="#D9D9D9" />
      </svg>
    </div>
  );
};
export default CongratsIcon;
