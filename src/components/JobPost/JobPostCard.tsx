import React from "react";
import RightArrowIcon from "../../svgs/RightArrowIcon";
import {
  getCategoryLabel,
  getPersonCountLabel,
  getSelectedDemolitionWorkLabels,
  getSelectedEquipmentLabels,
  getWorkDateLabel,
  getWorkTimeLabel,
} from "../../utils/jobPostingHelpers";

interface JobPostCardProps {
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedEquipment: string[];
  selectedExperience: string[];
  workStartTime: string;
  workEndTime: string;
  workMonth: number;
  workDay: number;
  selectedPersonCount: number;
  estimatedCost: { min: number; max: number };
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeContent?: () => void;
  onAddNewJob?: () => void;
}

const JobPostCard: React.FC<JobPostCardProps> = ({
  activeCategory,
  selectedDemolitionWork,
  selectedEquipment,
  workStartTime,
  workEndTime,
  workMonth,
  workDay,
  selectedPersonCount,
  estimatedCost,
  onEdit,
  onDelete,
  onChangeContent,
  onAddNewJob,
}) => {
  return (
    <div className="mb-3 rounded-[0.625rem] border border-zinc-300 bg-white px-6 py-5">
      {/* 카드 헤더 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold text-neutral-700">
            {getCategoryLabel(activeCategory)}
          </span>
          {onEdit && (
            <RightArrowIcon className="ml-3 cursor-pointer text-gray-500" />
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[0.625rem] text-neutral-400"
          >
            삭제
          </button>
        )}
      </div>

      {/* 카드 내용 */}
      <div className="space-y-2.5 text-sm text-zinc-500">
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
        {/* <div className="gap-6.5 flex">
          <span>최소 경력</span>
          <span className="font-medium text-neutral-600">
            {getSelectedExperienceLabels(selectedExperience) || "선택 안됨"}
          </span>
        </div> */}
        <div className="gap-6.5 flex">
          <span>근무 시간</span>
          <span className="font-medium text-neutral-600">
            {getWorkTimeLabel(workStartTime, workEndTime)}
          </span>
        </div>
        <div className="gap-6.5 flex">
          <span>근무 날짜</span>
          <span className="font-medium text-neutral-600">
            {getWorkDateLabel(workMonth, workDay)}
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
      <div className="mt-3">
        <div className="text-right">
          <span className="font-bold text-blue-600">
            총 {estimatedCost.min.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-2 flex flex-col items-end justify-center space-y-3">
        {onChangeContent && (
          <button
            onClick={onChangeContent}
            className="flex w-fit justify-end rounded-[0.625rem] bg-slate-100 px-3 py-2 text-xs font-medium text-neutral-400"
          >
            내용 변경
          </button>
        )}
        {onAddNewJob && (
          <button
            onClick={onAddNewJob}
            className="w-full border-t border-neutral-200 pt-3 text-sm font-medium text-zinc-500"
          >
            + 다른 업무 추가
          </button>
        )}
      </div>
    </div>
  );
};

export default JobPostCard;
