import React from "react";
import MultiSelector from "./MultiSelector";

interface ExperienceStepProps {
  selectedExperience: string[];
  onExperienceToggle: (experienceId: string) => void;
  onConfirm: () => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({
  selectedExperience,
  onExperienceToggle,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">최소 경력</span>을 선택해주세요
      </div>
      <MultiSelector
        selectedItems={selectedExperience}
        onItemToggle={onExperienceToggle}
        type="experience"
        className="mb-8"
      />

      {/* 확인 버튼 */}
      <div className="mb-4">
        <button
          onClick={onConfirm}
          disabled={selectedExperience.length === 0}
          className={`w-full rounded-xl py-3 text-lg text-white ${
            selectedExperience.length > 0 ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default ExperienceStep;
