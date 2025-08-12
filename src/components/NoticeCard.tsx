import { cn } from "@/utils/classname";
import React from "react";
import Chip from "./Chip";

type Props = {
  className?: string;
  date?: string;
  location?: string;
  workerType?: string;
  wage?: number;
};

const NoticeCard: React.FC<Props> = ({
  className,
  date,
  location,
  workerType,
  wage,
}) => {
  return (
    <div
      className={cn(
        "bg-gray-0 w-full rounded-[1.25rem] px-6 py-1.5",
        className,
      )}
    >
      <div className="relative flex flex-col pt-1.5 font-semibold">
        <p className="text-gray-3 text-left text-xs">{date}</p>
        <p className="text-gray-3 text-left text-xs">{location}</p>
        <div className="mt-3.5 flex gap-1.5 pb-1">
          <Chip className="bg-blue-5">점심제공</Chip>
          <Chip className="bg-blue-5">무료주차</Chip>
        </div>
        <div className="absolute bottom-0 right-0 gap-1 text-right">
          <p className="leading-1 text-gray-2 text-[0.625rem]">{workerType}</p>
          <p className="text-gray-3 text-[1.063rem] leading-none">{wage}원</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
