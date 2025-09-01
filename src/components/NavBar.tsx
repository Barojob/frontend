import HomeIcon from "@/svgs/HomeIcon";
import MatchIcon from "@/svgs/MatchIcon";
import TotalIcon from "@/svgs/TotalIcon";
import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
};

const NavBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex justify-around rounded-t-[1.25rem] bg-white px-[3.25rem] py-3 shadow-[0_4px_4px_7px_#D8E0ED99]",
        className,
      )}
    >
      <button className="flex flex-col items-center gap-y-1">
        {/* FIXME: url에 따라 색상 변경해주기 */}
        <HomeIcon className="size-7.5 text-blue-1" />
        <span className="text-blue-1 text-xs">홈</span>
      </button>

      <button className="flex flex-col items-center gap-y-1">
        <MatchIcon className="size-7.5" />
        <span className="text-gray-2 text-xs">매칭내역</span>
      </button>

      <button className="flex flex-col items-center gap-y-1">
        <TotalIcon className="size-7.5" />
        <span className="text-gray-2 text-xs">전체</span>
      </button>
    </div>
  );
};

export default NavBar;
