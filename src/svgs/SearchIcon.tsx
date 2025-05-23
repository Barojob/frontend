import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const SearchIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9707 18.0895H18.9832L18.6332 17.752C20.1332 16.002 20.9082 13.6145 20.4832 11.077C19.8957 7.60195 16.9957 4.82695 13.4957 4.40195C8.20819 3.75195 3.75819 8.20195 4.40819 13.4895C4.83319 16.9895 7.60819 19.8895 11.0832 20.477C13.6207 20.902 16.0082 20.127 17.7582 18.627L18.0957 18.977V19.9645L23.4082 25.277C23.9207 25.7895 24.7582 25.7895 25.2707 25.277C25.7832 24.7645 25.7832 23.927 25.2707 23.4145L19.9707 18.0895ZM12.4707 18.0895C9.35819 18.0895 6.84569 15.577 6.84569 12.4645C6.84569 9.35195 9.35819 6.83945 12.4707 6.83945C15.5832 6.83945 18.0957 9.35195 18.0957 12.4645C18.0957 15.577 15.5832 18.0895 12.4707 18.0895Z"
          fill="#707070"
        />
      </svg>
    </div>
  );
};
export default SearchIcon;
