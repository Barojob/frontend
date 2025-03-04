import React from "react";
import { cn } from "../../utils/classname";
import HomeIcon from "../../svgs/HomeIcon";
import MatchIcon from "../../svgs/MatchIcon";
import TotalIcon from "../../svgs/TotalIcon";

type Props = {
  className?: string;
};

const NavBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-[5.625rem] justify-between px-[3.25rem] pt-2 pb-6 bg-white w-full rounded-t-[1.25rem]",
        className
      )}
    >
      <button className="flex flex-col justify-center items-center">
        <HomeIcon />
        <div className="text-xs text-gray-1 text-nowrap mt-1">홈</div>
      </button>
      <button className="flex flex-col justify-center items-center">
        <MatchIcon />
        <div className="text-xs text-gray-2 text-nowrap mt-1">매칭내역</div>
      </button>
      <button className="flex flex-col justify-center items-center">
        <TotalIcon />
        <div className="text-xs text-gray-2 text-nowrap mt-1">전체</div>
      </button>
    </div>
  );
};

export default NavBar;
