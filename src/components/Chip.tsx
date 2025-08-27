import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Chip: React.FC<Props> = ({ children, className, onClick }) => {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={cn(
        "flex w-fit items-center justify-center rounded-[0.3125rem] bg-black px-1.5 py-0.5 text-[0.5rem] text-white",
        onClick && "cursor-pointer transition-colors hover:bg-gray-800",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default Chip;
