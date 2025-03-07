import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const HomeIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 15C17.7625 15 20 12.7625 20 10C20 7.2375 17.7625 5 15 5C12.2375 5 10 7.2375 10 10C10 12.7625 12.2375 15 15 15ZM15 17.5C11.6625 17.5 5 19.175 5 22.5V23.75C5 24.4375 5.5625 25 6.25 25H23.75C24.4375 25 25 24.4375 25 23.75V22.5C25 19.175 18.3375 17.5 15 17.5Z"
          className={cn("fill-[#615F5F]", className)}
        />
      </svg>
    </div>
  );
};
export default HomeIcon;
