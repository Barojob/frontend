import React from "react";
import RightArrowIcon from "../../svgs/RightArrowIcon";
import SearchIcon from "../../svgs/SearchIcon";
import { cn } from "../../utils/classname";
import Board from "./Board";

type Props = {
  className?: string;
  title: string;
  time: string;
  onClick: () => void;
};

const SearchBoard: React.FC<Props> = ({ className, title, time, onClick }) => {
  return (
    <div className="flex flex-col" onClick={onClick}>
      <div className="mb-3 flex items-center px-3">
        <div className="text-gray-3 text-xl font-bold leading-none">
          경기 포천시
        </div>
        <RightArrowIcon className="ml-3" />
      </div>
      <Board
        className={cn(
          "py-8.5 flex flex-col justify-center bg-blue-600",
          className,
        )}
      >
        <div className="flex items-center justify-center">
          <div className="text-[1.563rem] font-bold text-white">{title}</div>
          <SearchIcon className="ml-3 text-white" />
        </div>
        <div className="text-center text-xs font-medium text-white">
          지금 찾으면 <span className="text-red-300">{time} 뒤</span>에 공고를
          받아요!
        </div>
      </Board>
    </div>
  );
};
export default SearchBoard;
