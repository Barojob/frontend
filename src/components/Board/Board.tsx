import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Board: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("w-full rounded-[1.25rem] bg-white p-5", className)}>
      {children}
    </div>
  );
};
export default Board;
