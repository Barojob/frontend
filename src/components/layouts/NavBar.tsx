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
        "grid w-full grid-cols-3 justify-between gap-[5.625rem] rounded-t-[1.25rem] bg-white px-[3.25rem] py-3",
        className,
      )}
    >
      <button className="flex flex-col items-center justify-center">
        <HomeIcon />
        <div className="text-gray-1 mt-1 text-nowrap text-xs">홈</div>
      </button>
      <button className="flex flex-col items-center justify-center">
        <MatchIcon />
        <div className="text-gray-2 mt-1 text-nowrap text-xs">매칭내역</div>
      </button>
      <button className="flex flex-col items-center justify-center">
        <TotalIcon />
        <div className="text-gray-2 mt-1 text-nowrap text-xs">전체</div>
      </button>
    </div>
  );
};

export default NavBar;
