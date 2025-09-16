import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  isAlert: boolean;
};

const AlertIcon: React.FC<Props> = ({ className, isAlert }) => {
  return (
    <div className={cn("size-6 overflow-visible", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 20"
        fill="none"
        className="overflow-visible"
      >
        {isAlert && (
          <>
            <circle cx="20" cy="1" r="3" fill="#FD694B" />
          </>
        )}
        <path
          d="M1.93107 12.2611V7.0472C1.93107 3.15536 5.09594 0 9 0C12.9041 0 16.0684 3.15536 16.0684 7.04769V12.2616C17.1425 12.3068 18 13.1888 18 14.2709C18 15.382 17.0966 16.2827 15.9821 16.2827H2.01737C0.90291 16.2827 -0.000494003 15.382 -0.000494003 14.2709C-0.000494003 13.1888 0.856556 12.3068 1.93107 12.2616V12.2611Z"
          fill="#C5D6EE"
        />
        <path
          d="M8.99997 20C7.52701 20 6.29963 18.9513 6.02791 17.562C5.96923 17.2606 6.20396 16.9813 6.51167 16.9813H11.4883C11.7965 16.9813 12.0312 17.2606 11.972 17.562C11.7003 18.9513 10.4729 20 8.99997 20Z"
          fill="#247AF2"
        />
      </svg>
    </div>
  );
};

export default AlertIcon;
