import React from "react";
import { cn } from "../../utils/classname";
import { getPerPersonAmount } from "../../utils/jobPostingHelpers";

type Props = {
  className?: string;
  onClick?: () => void;
  selectedJobTypes?: string[];
  selectedDemolitionWork?: string[];
  selectedEquipment?: string[];
  selectedMatchingType?: "smart" | "direct" | null;
  totalPersonCount?: number;
  isMatchingStep?: boolean;
};

const CompleteBar: React.FC<Props> = ({
  className,
  onClick,
  selectedJobTypes,
  selectedDemolitionWork,
  selectedEquipment,
  selectedMatchingType,
  totalPersonCount,
  isMatchingStep = false,
}) => {
  const perPerson = getPerPersonAmount({
    selectedJobTypes,
    selectedDemolitionWork,
    selectedEquipment,
  });

  const totalAmount = perPerson * (totalPersonCount || 1);

  const getButtonText = () => {
    if (!isMatchingStep) return "설정 완료";
    if (!selectedMatchingType) return "매칭 선택";
    if (selectedMatchingType === "smart") return "스마트 매칭";
    if (selectedMatchingType === "direct") return "직접 매칭";
    return "매칭 선택";
  };

  const isButtonDisabled = isMatchingStep ? !selectedMatchingType : false;

  const getDisplayText = () => {
    if (!isMatchingStep) {
      return {
        countText: "1인당",
        amount: perPerson,
      };
    }
    return {
      countText: `총 ${totalPersonCount || 1}명`,
      amount: totalAmount,
    };
  };

  const { countText, amount } = getDisplayText();
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex items-center justify-between rounded-t-[1.25rem] bg-white px-8 py-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-5 drop-shadow-[0_0_0.375rem_rgba(116,116,116,0.3)]",
        className,
      )}
    >
      <div className="flex flex-col justify-start font-semibold">
        <p className="text-base text-neutral-600">{countText}</p>
        <p className="text-xl text-blue-600">{amount.toLocaleString()}원</p>
      </div>
      <button
        onClick={onClick}
        disabled={isButtonDisabled}
        className={cn(
          "w-fit rounded-[0.625rem] px-11 py-3 font-bold text-white",
          isButtonDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700",
        )}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default CompleteBar;
