import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  currentIndex: number;
  length: number;
};

const AdIndicator: React.FC<Props> = ({ className, currentIndex, length }) => {
  return (
    <div
      className={cn(
        "w-fit rounded-[0.625rem] bg-black/30 px-1.5 py-0.5",
        className,
      )}
    >
      <div className="text-center text-[0.625rem] font-medium text-white">
        {currentIndex}
        <span className="text-white/50">
          {" / "}
          {length}
        </span>
      </div>
    </div>
  );
};
export default AdIndicator;
