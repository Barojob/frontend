import MultiSelector from "@/components/JobPost/MultiSelector";
import React from "react";

interface DemolitionWorkStepProps {
  selectedDemolitionWork: string[];
  onDemolitionWorkToggle: (demolitionWorkId: string) => void;
  onConfirm: () => void;
  selectedJobTypes?: string[];
}

const DemolitionWorkStep: React.FC<DemolitionWorkStepProps> = ({
  selectedDemolitionWork,
  onDemolitionWorkToggle,
  onConfirm,
  selectedJobTypes,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">세부 업무</span>를 선택해주세요
      </div>
      <MultiSelector
        selectedItems={selectedDemolitionWork}
        onItemToggle={onDemolitionWorkToggle}
        type="demolitionWork"
        selectedJobTypes={selectedJobTypes}
        className="mb-8"
      />

      {/* 확인 버튼 */}
      <div className="mb-4">
        <button
          onClick={onConfirm}
          disabled={selectedDemolitionWork.length === 0}
          className={`w-full rounded-xl py-3 text-lg text-white ${
            selectedDemolitionWork.length > 0 ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default DemolitionWorkStep;
