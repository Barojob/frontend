import { cn } from "@/utils/classname";
import React from "react";
import Chip from "../Chip";

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
        "w-full rounded-[1.25rem] bg-gray-0 px-6 py-1.5",
        className,
      )}
    >
      <div className="relative flex flex-col pt-1.5 font-semibold">
        <p className="text-left text-xs text-gray-3">{date}</p>
        <p className="text-left text-xs text-gray-3">{location}</p>
        <div className="mt-3.5 flex gap-1.5 pb-1">
          <Chip className="bg-blue-5">점심제공</Chip>
          <Chip className="bg-blue-5">무료주차</Chip>
        </div>
        <div className="absolute bottom-0 right-0 gap-1 text-right">
          <p className="leading-1 text-[0.625rem] text-gray-2">{workerType}</p>
          <p className="text-[1.063rem] leading-none text-gray-3">{wage}원</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
