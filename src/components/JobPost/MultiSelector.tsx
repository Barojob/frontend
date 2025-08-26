import React from "react";

interface SelectOption {
  id: string;
  label: string;
}

interface MultiSelectorProps {
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  type: "jobType" | "demolitionWork" | "equipment" | "experience";
  category?: string;
  className?: string;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({
  selectedItems,
  onItemToggle,
  type,
  category,
  className = "",
}) => {
  // 어떤 사람?
  const generalJobTypes: SelectOption[] = [
    { id: "general-labor", label: "보통 인부" },
    { id: "material-mgmt", label: "자재 정리" },
    { id: "signal-worker", label: "신호수" },
    { id: "demolition", label: "해체 정리" },
    { id: "kitchen", label: "곰방" },
    { id: "cleaning", label: "양중" },
    { id: "demolition-work", label: "철거" },
  ];

  const skilledJobTypes: SelectOption[] = [
    { id: "carpenter", label: "목수" },
    { id: "rebar", label: "철근" },
    { id: "concrete", label: "콘크리트" },
    { id: "tile", label: "타일" },
  ];

  // 세부 업무
  const demolitionWorkOptions: SelectOption[] = [
    { id: "clean-up", label: "자재 정리" },
    { id: "spadework", label: "삽질" },
    { id: "sawing", label: "톱질" },
    { id: "sickle", label: "낫질" },
  ];

  // 장비 옵션들
  const equipmentOptions: SelectOption[] = [
    { id: "none", label: "없음" },
    { id: "hammer-drill", label: "함마드릴" },
    { id: "grinder", label: "그라인더" },
    { id: "hydraulic-crusher", label: "유압크라샤" },
    { id: "tower-crane-signal", label: "타워크레인 신호수 자격" },
  ];

  // 경력 옵션들
  const experienceOptions: SelectOption[] = [
    { id: "unverified", label: "미검증" },
    { id: "general", label: "일반" },
    { id: "intermediate", label: "중급" },
    { id: "advanced", label: "고급" },
  ];

  const getOptions = (): SelectOption[] => {
    switch (type) {
      case "jobType":
        return category === "general" ? generalJobTypes : skilledJobTypes;
      case "demolitionWork":
        return demolitionWorkOptions;
      case "equipment":
        return equipmentOptions;
      case "experience":
        return experienceOptions;
      default:
        return [];
    }
  };

  const options = getOptions();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedItems.includes(option.id);

        return (
          <button
            key={option.id}
            onClick={() => onItemToggle(option.id)}
            className={`w-fit rounded-[0.625rem] px-3.5 py-2.5 text-sm font-normal transition-all duration-200 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelector;
