import React, { useState } from "react";
import CategoryTabs from "../../components/JobPost/CategoryTabs";
import JobTypeSelector from "../../components/JobPost/JobTypeSelector";
import NavigationHeader from "../../components/layouts/NavigationHeader";
import StepIndicator from "../../components/StepIndicator";

type Props = {
  className?: string;
};

const JobPostingPage: React.FC<Props> = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const handleJobTypeToggle = (jobTypeId: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobTypeId)
        ? prev.filter((id) => id !== jobTypeId)
        : [...prev, jobTypeId],
    );
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // 카테고리 변경 시 선택된 직무 초기화
    setSelectedJobTypes([]);
  };

  return (
    <div className="flex w-full flex-col justify-start px-6">
      <NavigationHeader title="인력 구하기" className="mb-7" />
      <StepIndicator currentStep={1} totalSteps={3} className="mb-7.5" />

      <div className="mb-8 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">어떤 사람</span>이 필요하신가요?
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        className="mb-6"
      />

      <JobTypeSelector
        selectedJobTypes={selectedJobTypes}
        onJobTypeToggle={handleJobTypeToggle}
        category={activeCategory}
        className="mb-8"
      />
    </div>
  );
};

export default JobPostingPage;
