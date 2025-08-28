import { JobCategory } from "@/fixtures/jobs";
import useSignupContext from "@/hooks/useSignupContext";
import { SignupStep } from "@/types/signup";
import { useEffect, useState } from "react";

type UseWorkerExperienceProps = {
  onValidityChange: (isValid: boolean) => void;
  onSelectedJobsChange?: (count: number) => void;
};

export const useWorkerExperience = ({
  onValidityChange,
  onSelectedJobsChange,
}: UseWorkerExperienceProps) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [selectedCategory, setSelectedCategory] = useState<JobCategory | "">(
    "",
  );
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  useEffect(() => {
    onValidityChange(true);
    onSelectedJobsChange?.(selectedJobs.length);
  }, [onValidityChange, selectedJobs, onSelectedJobsChange]);

  const handleCategorySelect = (category: JobCategory) => {
    setSelectedCategory(category);
    setSelectedJobs([]);
  };

  const handleJobToggle = (job: string) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job],
    );
  };

  const handleNext = () => {
    // FIXME: 선택된 경험(selectedJobs)을 상태나 API로 저장하는 로직 필요
    setCurrentStep(SignupStep.WORKER_LICENSE);
  };

  return {
    selectedCategory,
    selectedJobs,
    handleCategorySelect,
    handleJobToggle,
    handleNext,
  };
};
