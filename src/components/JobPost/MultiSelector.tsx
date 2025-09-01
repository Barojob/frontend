import {
  getDemolitionWorkOptions,
  SelectOption,
} from "@/utils/jobTypeDemolitionMap";
import React, { useMemo } from "react";

// SelectOption은 공용 타입 사용

interface MultiSelectorProps {
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  type: "jobType" | "demolitionWork" | "equipment" | "experience";
  category?: string;
  selectedJobTypes?: string[];
  className?: string;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({
  selectedItems,
  onItemToggle,
  type,
  category,
  selectedJobTypes,
  className = "",
}) => {
  const generalJobTypes: SelectOption[] = [
    { id: "general-labor", label: "보통인부" },
    { id: "signal", label: "신호수" },
    { id: "lifting", label: "양중" },
    { id: "gombang", label: "곰방" },
    { id: "demolition", label: "철거" },
  ];

  const skilledJobTypes: SelectOption[] = [
    { id: "carpenter", label: "목수" },
    { id: "rebar", label: "철근" },
    { id: "concrete", label: "콘크리트" },
    { id: "tile", label: "타일" },
    { id: "plumber", label: "배관공" },
    { id: "electrician", label: "전기공" },
  ];

  // 세부 업무
  // 세부 업무: 선택된 직업(업무)에 따라 동적 생성
  const demolitionWorkOptions: SelectOption[] = useMemo(() => {
    return type === "demolitionWork"
      ? getDemolitionWorkOptions(selectedJobTypes)
      : [];
  }, [type, selectedJobTypes]);

  // 장비 옵션들
  const equipmentOptions: SelectOption[] = [
    { id: "none", label: "없음" },
    { id: "grinder", label: "그라인더" },
    { id: "hammer-drill", label: "헤머드릴" },
    { id: "hydraulic-crusher", label: "유압크라샤" },
  ];

  // // 경력 옵션들
  // const experienceOptions: SelectOption[] = [
  //   { id: "unverified", label: "미검증" },
  //   { id: "general", label: "일반" },
  //   { id: "intermediate", label: "중급" },
  //   { id: "advanced", label: "고급" },
  // ];

  const getOptions = (): SelectOption[] => {
    switch (type) {
      case "jobType":
        return category === "general" ? generalJobTypes : skilledJobTypes;
      case "demolitionWork":
        return demolitionWorkOptions;
      case "equipment":
        return equipmentOptions;
      // case "experience":
      //   return experienceOptions;
      default:
        return [];
    }
  };

  const options = getOptions();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedItems.includes(option.id);

        const handleClick = () => {
          if (type === "demolitionWork") {
            if (isSelected) {
              onItemToggle(option.id);
              return;
            }
            // 단일 선택 강제: 기존 선택 해제 후 현재만 선택
            selectedItems.forEach((selectedId) => {
              if (selectedId !== option.id) onItemToggle(selectedId);
            });
            onItemToggle(option.id);
            return;
          }

          onItemToggle(option.id);
        };

        return (
          <button
            key={option.id}
            onClick={handleClick}
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
