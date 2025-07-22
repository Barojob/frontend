import React from "react";

interface JobType {
  id: string;
  label: string;
}

interface JobTypeSelectorProps {
  selectedJobTypes: string[];
  onJobTypeToggle: (jobTypeId: string) => void;
  category: string;
  className?: string;
}

const JobTypeSelector: React.FC<JobTypeSelectorProps> = ({
  selectedJobTypes,
  onJobTypeToggle,
  category,
  className = "",
}) => {
  const generalJobTypes: JobType[] = [
    { id: "general-labor", label: "보통 인부" },
    { id: "material-mgmt", label: "자재 정리" },
    { id: "newcomer", label: "신호수" },
    { id: "detailed-mgmt", label: "해체 정리" },
    { id: "kitchen", label: "급방" },
    { id: "clothing", label: "양중" },
    { id: "cleaning", label: "청겐" },
  ];

  const skilledJobTypes: JobType[] = [
    { id: "carpenter", label: "목수" },
    { id: "rebar", label: "철근" },
    { id: "concrete", label: "콘크리트" },
    { id: "tile", label: "타일" },
    { id: "plumbing", label: "배관" },
    { id: "electrical", label: "전기" },
    { id: "painting", label: "도장" },
  ];

  const jobTypes = category === "general" ? generalJobTypes : skilledJobTypes;

  return (
    <div className={`grid grid-cols-4 gap-3 ${className}`}>
      {jobTypes.map((jobType) => {
        const isSelected = selectedJobTypes.includes(jobType.id);

        return (
          <button
            key={jobType.id}
            onClick={() => onJobTypeToggle(jobType.id)}
            className={`rounded-[0.625rem] px-3 py-2.5 text-xs font-normal transition-all duration-200 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {jobType.label}
          </button>
        );
      })}
    </div>
  );
};

export default JobTypeSelector;
