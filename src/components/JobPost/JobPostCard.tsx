import {
  getCategoryLabel,
  getPersonCountLabel,
  getSelectedDemolitionWorkLabels,
  getSelectedEquipmentLabels,
  getSelectedExperienceLabels,
  getWorkTimeLabel,
} from "@/utils/jobPostingHelpers";
import React from "react";

interface JobPostCardProps {
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  selectedPersonCount: number;
  estimatedCost: { min: number; max: number };
  onEdit?: () => void;
  onDelete?: () => void;
}

const JobPostCard: React.FC<JobPostCardProps> = ({
  activeCategory,
  selectedDemolitionWork,
  selectedEquipment,
  selectedExperience,
  workStartTime,
  workEndTime,
  selectedPersonCount,
  estimatedCost,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mb-3 rounded-[0.625rem] bg-gray-100 px-6 py-5">
      {/* 카드 헤더 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="17"
              viewBox="0 0 26 17"
              fill="none"
            >
              <path
                d="M13.2026 2.04333C18.8374 2.04333 23.4518 6.91558 23.8726 13.101H2.53271C2.95342 6.91561 7.56788 2.04339 13.2026 2.04333Z"
                fill="#C5D6EF"
              />
              <rect
                x="0.480957"
                y="12.7468"
                width="25.519"
                height="4.25316"
                rx="2.12658"
                fill="#247AF2"
              />
              <path
                d="M9.69031 1.82452C9.61743 0.94999 10.3076 0.199951 11.1851 0.199951H15.2969C16.1744 0.199951 16.8646 0.94999 16.7917 1.82452L16.1202 9.88274C16.0554 10.6602 15.4055 11.2582 14.6254 11.2582H11.8566C11.0765 11.2582 10.4266 10.6602 10.3618 9.88274L9.69031 1.82452Z"
                fill="#247AF2"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-neutral-700">
            {getCategoryLabel(activeCategory)}
          </span>
          {onEdit && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              className="ml-2 cursor-pointer"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="#6B7684"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="rounded-full bg-white px-2.5 py-1 text-xs text-neutral-400"
          >
            삭제
          </button>
        )}
      </div>

      {/* 카드 내용 */}
      <div className="space-y-2.5 px-1 text-sm text-zinc-500">
        <div className="gap-6.5 flex">
          <span>세부 업무</span>
          <span className="font-medium text-neutral-600">
            {getSelectedDemolitionWorkLabels(selectedDemolitionWork) ||
              "선택 안됨"}
          </span>
        </div>
        <div className="gap-6.5 flex">
          <span>필요 장비</span>
          <span className="font-medium text-neutral-600">
            {getSelectedEquipmentLabels(selectedEquipment) || "선택 안됨"}
          </span>
        </div>
        <div className="gap-6.5 flex">
          <span>최소 경력</span>
          <span className="font-medium text-neutral-600">
            {getSelectedExperienceLabels(selectedExperience) || "선택 안됨"}
          </span>
        </div>
        <div className="gap-6.5 flex">
          <span>근무 시간</span>
          <span className="font-medium text-neutral-600">
            {getWorkTimeLabel(workStartTime, workEndTime)}
          </span>
        </div>
        <div className="gap-6.5 flex">
          <span>근무 인원</span>
          <span className="font-medium text-neutral-600">
            {getPersonCountLabel(selectedPersonCount)}
          </span>
        </div>
      </div>

      {/* 예상 금액 */}
      <div className="mt-3 border-t border-slate-300 pt-1">
        <div className="text-right">
          <span className="font-bold text-blue-600">
            총 {estimatedCost.min.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
