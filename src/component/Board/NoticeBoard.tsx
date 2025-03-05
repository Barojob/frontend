import React from "react";
import { cn } from "../../utils/classname";
import Board from "./Board";
import RightArrowIcon from "../../svgs/RightArrowIcon";

type Props = {
  className?: string;
};

const NoticeBoard: React.FC<Props> = ({ className }) => {
  return (
    <Board className={cn("flex flex-col justify-center", className)}>
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="font-semibold text-xl text-gray-3 leading-none">
            선착순 공고
          </div>
          <RightArrowIcon className="ml-3" />
        </div>
        <button className="bg-gray-5 border-gray-5 rounded-[0.625rem] text-[0.688rem] font-semibold text-gray-4 leading-none px-3 py-[0.313rem]">
          더보기
        </button>
      </div>
    </Board>
  );
};
export default NoticeBoard;
