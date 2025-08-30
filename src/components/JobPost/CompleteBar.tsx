import React from "react";
import { cn } from "../../utils/classname";
import { getPerPersonAmount } from "../../utils/jobPostingHelpers";

type Props = {
  className?: string;
  onClick?: () => void;
  selectedJobTypes?: string[];
  selectedDemolitionWork?: string[];
  selectedEquipment?: string[];
};

const CompleteBar: React.FC<Props> = ({
  className,
  onClick,
  selectedJobTypes,
  selectedDemolitionWork,
  selectedEquipment,
}) => {
  const perPerson = getPerPersonAmount({
    selectedJobTypes,
    selectedDemolitionWork,
    selectedEquipment,
  });
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex items-center justify-between rounded-t-[1.25rem] bg-white px-8 py-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-5 drop-shadow-[0_0_0.375rem_rgba(116,116,116,0.3)]",
        className,
      )}
    >
      <div className="flex flex-col justify-start font-semibold">
        <p className="text-base text-neutral-600">1인당</p>
        <p className="text-xl text-blue-600">{perPerson.toLocaleString()}원</p>
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
