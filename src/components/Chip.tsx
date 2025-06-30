import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Chip: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center justify-center rounded-[0.3125rem] bg-black px-1.5 py-0.5 text-[0.5rem] text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
