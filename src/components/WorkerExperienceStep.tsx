import React from "react";
import Button from "../../components/Button";
import { JOB_CATEGORIES, JobCategory } from "../../fixtures/jobs";
import { useWorkerExperience } from "../../hooks/useWorkerExperience";
import { cn } from "../../utils/classname";

type WorkerExperienceStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onSelectedJobsChange?: (count: number) => void;
};

const WorkerExperienceStep: React.FC<WorkerExperienceStepProps> = ({
  className,
  onValidityChange,
  onSelectedJobsChange,
}) => {
  const {
    selectedCategory,
    selectedJobs,
    handleCategorySelect,
    handleJobToggle,
    handleNext,
  } = useWorkerExperience({ onValidityChange, onSelectedJobsChange });

  const jobCategories = Object.keys(JOB_CATEGORIES) as JobCategory[];

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1">
        <div className="mt-8">
          <div className="text-2xl font-bold text-gray-900">
            이전에 <span className="text-blue-500">어떤 경험</span>을
          </div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            했는지 체크해주세요
          </div>
        </div>

        <div className="mt-12">
          <div className="relative flex overflow-hidden rounded-xl border border-gray-500">
            {jobCategories.map((category, index) => (
              <React.Fragment key={category}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={cn(
                    "flex-1 px-6 py-3 text-center font-medium",
                    selectedCategory === category
                      ? "bg-[#D3DFFF] font-bold text-[#247AF2]"
                      : "bg-white text-gray-300 hover:bg-gray-50",
                  )}
                >
                  {category}
                </button>
                {index < jobCategories.length - 1 && (
                  <div className="w-px bg-gray-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="animate-slide-up mt-8">
            <div className="grid grid-cols-4 gap-3">
              {JOB_CATEGORIES[selectedCategory].map((job) => (
                <button
                  key={job}
                  onClick={() => handleJobToggle(job)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-center text-sm font-medium",
                    selectedJobs.includes(job)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                  )}
                >
                  {job}
                </button>
              ))}
            </div>

            {selectedJobs.length > 0 && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {selectedJobs.length}개의 경험을 선택했습니다
              </div>
            )}
          </div>
        )}
      </div>

      <div className="animate-slide-up fixed-bottom-button">
        <Button onClick={handleNext} theme="primary" size="md" block>
          {selectedJobs.length === 0 ? "건너뛰기" : "다음 단계"}
        </Button>
      </div>
    </div>
  );
};

export default WorkerExperienceStep;
