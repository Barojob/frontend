import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
};

const PersonIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("size-7", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 35" fill="none">
        <g clipPath="url(#clip0_2746_6498)">
          <path
            d="M19.5474 16.4153C23.1638 12.6601 23.1638 6.57181 19.5474 2.81665C15.9309 -0.938513 10.0675 -0.938513 6.45101 2.81665C2.83455 6.57181 2.83455 12.6601 6.45101 16.4153C10.0675 20.1704 15.9309 20.1704 19.5474 16.4153Z"
            fill="#247AF2"
          />
          <path
            d="M17.2938 22.1586H8.70619C3.89807 22.1586 0 26.2061 0 31.1987C0 33.2979 1.63927 35 3.66093 35H22.3381C24.3597 35 25.999 33.2979 25.999 31.1987C25.999 26.2061 22.1009 22.1586 17.2928 22.1586H17.2938Z"
            fill="#247AF2"
          />
        </g>
        <defs>
          <clipPath id="clip0_2746_6498">
            <rect width="26" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
export default PersonIcon;
