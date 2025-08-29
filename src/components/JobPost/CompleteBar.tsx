import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  onClick?: () => void;
};

const CompleteBar: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between rounded-t-[1.25rem] bg-white px-8 py-4 pb-10 pt-5 drop-shadow-[0_0_0.375rem_rgba(116,116,116,0.3)]",
        className,
      )}
    >
      <div className="flex flex-col justify-start font-semibold">
        <p className="text-base text-neutral-600">1인당</p>
        <p className="text-xl text-blue-600">100,000원</p>
      </div>
      <button
        onClick={onClick}
        className="w-fit rounded-[0.625rem] bg-blue-600 px-11 py-3 font-bold text-white"
      >
        설정 완료
      </button>
    </div>
  );
};

export default CompleteBar;
