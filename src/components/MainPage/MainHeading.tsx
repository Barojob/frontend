import { cn } from "@/utils/classname";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  className?: string;
  title: string;
};

const MainHeading: React.FC<Props> = ({ className, title }) => {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      <h2 className="font-bold text-[#494B4F]">{title}</h2>
      <ChevronRightIcon className="stroke-4 size-3 text-[#6B7684]" />
    </div>
  );
};

export default MainHeading;
