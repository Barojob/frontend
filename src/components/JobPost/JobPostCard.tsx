import RightArrowIcon from "@/svgs/RightArrowIcon";
import {
  calculateEquipmentAddition,
  getBaseWage,
  getCategoryLabel,
  getPersonCountLabel,
  getSelectedDemolitionWorkLabels,
  getSelectedEquipmentLabels,
  getSubAdjustment,
  getWorkDateLabel,
  getWorkTimeLabel,
} from "@/utils/jobPostingHelpers";
import React from "react";

interface JobPostCardProps {
  activeCategory: string;
  selectedDemolitionWork: string[];
  selectedJobTypes: string[];
  selectedEquipment: string[];
  selectedExperience?: string[];
  workStartTime: string;
  workEndTime: string;
  workMonth: number;
  workDay: number;
  selectedPersonCount: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeContent?: () => void;
  onAddNewJob?: () => void;
  variant?: "default" | "matching";
}

const JobPostCard: React.FC<JobPostCardProps> = ({
  activeCategory,
  selectedDemolitionWork,
  selectedJobTypes,
  selectedEquipment,
  workStartTime,
  workEndTime,
  workMonth,
  workDay,
  selectedPersonCount,
  onEdit,
  onDelete,
  onChangeContent,
  onAddNewJob,
  variant = "default",
}) => {
  return (
    <div className="mb-3 rounded-[0.625rem] border border-zinc-300 bg-white px-6 py-5">
      {/* 카드 헤더 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold text-neutral-700">
            {getCategoryLabel(activeCategory)}
          </span>
          {onEdit && variant !== "matching" && (
            <RightArrowIcon className="ml-3" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[0.625rem] text-neutral-400"
            >
              삭제
            </button>
          )}
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="space-y-1 text-sm text-zinc-500">
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
        {variant === "matching" && (
          <div className="mt-2.5 h-[0.5px] w-full bg-neutral-200" />
        )}
      </div>

      {/* 예상 금액 */}
      <div className="mt-3">
        <div className="text-right">
          <span className="font-bold text-blue-600">
            총{" "}
            {(
              (getBaseWage(selectedJobTypes) +
                getSubAdjustment(selectedDemolitionWork) +
                calculateEquipmentAddition(selectedEquipment)) *
              selectedPersonCount
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col items-end justify-center space-y-3">
        {onChangeContent && (
          <button
            onClick={onChangeContent}
            className="mt-2 flex w-fit justify-end rounded-[0.625rem] bg-slate-100 px-3 py-2 text-xs font-medium text-neutral-400"
          >
            내용 변경
          </button>
        )}
      </div>

      {/* 다른 업무 추가 버튼 */}
      {onAddNewJob && (
        <div className="mt-3 border-t border-neutral-200 pt-3">
          <button
            onClick={onAddNewJob}
            className="w-full cursor-pointer text-sm font-medium text-zinc-500 hover:text-blue-600"
          >
            + 다른 업무 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default JobPostCard;
