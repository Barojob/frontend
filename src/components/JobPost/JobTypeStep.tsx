import React from "react";
import CategoryTabs from "./CategoryTabs";
import MultiSelector from "./MultiSelector";

interface JobTypeStepProps {
  activeCategory: string;
  selectedJobTypes: string[];
  onCategoryChange: (category: string) => void;
  onJobTypeToggle: (jobTypeId: string) => void;
  onConfirm: () => void;
}

const JobTypeStep: React.FC<JobTypeStepProps> = ({
  activeCategory,
  selectedJobTypes,
  onCategoryChange,
  onJobTypeToggle,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 mt-2 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">어떤 사람</span>이 필요하신가요?
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        className="mb-6"
      />

      <MultiSelector
        selectedItems={selectedJobTypes}
        onItemToggle={onJobTypeToggle}
        type="jobType"
        category={activeCategory}
        className="mb-8"
      />

      {/* 확인 버튼 */}
      <div className="mb-4">
        <button
          onClick={onConfirm}
          disabled={selectedJobTypes.length === 0}
          className={`w-full rounded-xl py-3 text-lg font-bold text-white ${
            selectedJobTypes.length > 0 ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default JobTypeStep;
