import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

const Tab: React.FC<Props> = ({
  className,
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center border-b-2 px-4 py-2 font-bold transition-colors",
        isActive
          ? "text-blue-1 border-blue-1"
          : "border-transparent text-gray-400",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tab;
