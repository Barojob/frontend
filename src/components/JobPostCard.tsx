import { cn } from "@/utils/classname";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  className?: string;
};

const JobPostCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("bg-blue-1 h-28 rounded-2xl", className)}>
      <section className="flex h-full flex-col items-center justify-center">
        <div className="flex items-center gap-x-3">
          <span className="text-2xl font-bold text-white">근로자 요청하기</span>
          <MagnifyingGlassIcon className="size-4.5 text-[#C5D6EF]" />
        </div>

        <span className="whitespace-pre-wrap text-xs font-medium">
          <span className="text-[#C5D6EF]">{`지금 찾으면 `}</span>
          <span className="text-[#FFAD9C]">3시간 뒤</span>
          <span className="text-[#C5D6EF]">에 공고를 받아요!</span>
        </span>
      </section>
    </div>
  );
};

export default JobPostCard;
