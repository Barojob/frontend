import Logo from "@/svgs/LogoIcon";
import { cn } from "@/utils/classname";
import { noop } from "lodash-es";
import React, { useState } from "react";
import { IoPerson, IoSwapVertical } from "react-icons/io5";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  // FIXME: legacy code
  // const { isWorker, isEmployer, setWorker, setEmployer } = useUserType();
  const { isWorker, isEmployer, setWorker, setEmployer } = {
    isWorker: false,
    isEmployer: false,
    setWorker: noop,
    setEmployer: noop,
  };

  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const handleTypeChange = () => {
    setShowTypeSelector(!showTypeSelector);
  };

  const handleSelectType = (type: "worker" | "employer") => {
    if (type === "worker") {
      setWorker();
    } else {
      setEmployer();
    }
    setShowTypeSelector(false);
  };

  return (
    <div
      className={cn(
        "relative flex h-14 w-full items-center justify-between px-6",
        className,
      )}
    >
      <Logo />

      <div className="flex items-center gap-3">
        {/* 사용자 타입 선택 (테스트용) */}
        <div className="relative">
          <button
            onClick={handleTypeChange}
            className="text-gray-1 flex w-fit items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1.5 text-xs"
          >
            <div className="rounded-full p-1">
              <IoPerson className="text-[10px] text-gray-400" />
            </div>
            {isWorker ? "근로자" : isEmployer ? "구인자" : "역할 선택"}
            <IoSwapVertical className="text-[10px] text-gray-400" />
          </button>

          {showTypeSelector && (
            <div className="absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border bg-white shadow-lg">
              <button
                onClick={() => handleSelectType("worker")}
                className={cn(
                  "w-full rounded-t-lg px-3 py-2 text-left text-xs hover:bg-gray-50",
                  isWorker && "bg-blue-50 text-blue-600",
                )}
              >
                근로자
              </button>
              <button
                onClick={() => handleSelectType("employer")}
                className={cn(
                  "w-full rounded-b-lg px-3 py-2 text-left text-xs hover:bg-gray-50",
                  isEmployer && "bg-blue-50 text-blue-600",
                )}
              >
                구인자
              </button>
            </div>
          )}
        </div>

        {/* 로그인 버튼 */}
        <Link
          to="/intro"
          className="text-gray-1 flex w-fit items-center gap-0.5 rounded-lg border bg-white px-2.5 py-1.5 text-xs"
        >
          <div className="rounded-full p-1">
            <IoPerson className="text-[10px] text-gray-400" />
          </div>
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Header;
