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
        <div className="font-semibold text-xl text-gray-3 leading-none">
          경기 포천시
        </div>
        <RightArrowIcon className="ml-3" />
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="text-[1.563rem] font-normal text-blue-3 leading-none">
          일자리 요청하기
        </div>
        <SearchIcon className="ml-3" />
      </div>
      <div className="text-xs font-medium text-center mt-[0.625rem] pb-2">
        지금 찾으면 <span className="text-blue-4">3시간 </span>뒤에 공고를
        받아요!
      </div>
    </Board>
  );
};
export default SearchBoard;
