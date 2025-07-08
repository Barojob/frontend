import React from "react";
import { cn } from "../../utils/classname";
import Board from "./Board";
import RightArrowIcon from "../../svgs/RightArrowIcon";
import SearchIcon from "../../svgs/SearchIcon";

type Props = {
  className?: string;
};

const SearchBoard: React.FC<Props> = ({ className }) => {
  return (
    <Board className={cn("flex flex-col justify-center", className)}>
      <div className="flex items-center">
        <div className="text-gray-3 text-xl font-semibold leading-none">
          경기 포천시
        </div>
        <RightArrowIcon className="ml-3" />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="text-blue-3 text-[1.563rem] font-normal leading-none">
          일자리 요청하기
        </div>
        <SearchIcon className="ml-3" />
      </div>
      <div className="mt-[0.625rem] pb-2 text-center text-xs font-medium">
        지금 찾으면 <span className="text-blue-4">3시간 </span>뒤에 공고를
        받아요!
      </div>
    </Board>
  );
};
export default SearchBoard;
