import HomeIcon from "@/svgs/HomeIcon";
import MatchIcon from "@/svgs/MatchIcon";
import PersonIcon from "@/svgs/PersonIcon";
import { cn } from "@/utils/classname";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const NavBar: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMatchingClick = () => {
    navigate("/matching-list");
  };

  const handleMyClick = () => {
    // TODO: 마이 페이지 구현 후 경로 추가
    console.log("마이 페이지는 아직 구현되지 않았습니다.");
  };

  const isHomeActive = location.pathname === "/";
  const isMatchingActive = location.pathname === "/matching-list";

  return (
    <div
      className={cn(
        "px-15 flex justify-between rounded-t-[1.25rem] bg-white py-4 pb-[env(safe-area-inset-bottom)] shadow-[0_4px_4px_7px_#D8E0ED99]",
        className,
      )}
    >
      <button
        className="flex flex-col items-center gap-y-1"
        onClick={handleHomeClick}
      >
        <HomeIcon className="h-7 w-6" />
        <span
          className={cn(
            "text-xs",
            isHomeActive
              ? "text-blue-1 font-bold"
              : "font-medium text-gray-500",
          )}
        >
          홈
        </span>
      </button>

      <button
        className="flex flex-col items-center gap-y-1"
        onClick={handleMatchingClick}
      >
        <MatchIcon className="h-7 w-6" />
        <span
          className={cn(
            "text-xs",
            isMatchingActive
              ? "text-blue-1 font-bold"
              : "font-medium text-gray-500",
          )}
        >
          매칭내역
        </span>
      </button>

      <button
        className="flex flex-col items-center gap-y-1"
        onClick={handleMyClick}
      >
        <PersonIcon className="h-7 w-5" />
        <span className="text-xs font-medium text-gray-500">마이</span>
      </button>
    </div>
  );
};

export default NavBar;
