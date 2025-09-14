import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  additionalClassName?: string;
  worker: {
    id: string;
    name: string;
    workType: string;
    totalExperience: number;
    matchingScore: number;
    rating: number;
    reviewCount: number;
    price: number;
    isRecommended?: boolean;
    isPriorityMatch?: boolean;
  };
  isSelected?: boolean;
  onSelect?: (workerId: string) => void;
  onViewDetails?: (workerId: string) => void;
};

const WorkerCard: React.FC<Props> = ({
  className,
  additionalClassName,
  worker,
  isSelected = false,
  onSelect,
  onViewDetails,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
        isSelected && "border-blue-500 bg-blue-50",
        className,
        additionalClassName,
      )}
    >
      {/* 추천 배지 */}
      {worker.isRecommended && (
        <div className="mb-3 flex items-center gap-2">
          <div className="rounded-full bg-blue-100 px-2 py-1">
            <span className="text-xs font-medium text-blue-600">추천</span>
          </div>
        </div>
      )}

      {/* 상단 섹션 - 기본 정보 */}
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <span className="text-lg font-medium text-blue-600">
              {worker.name.charAt(0)}
            </span>
          </div>
          <p className="mt-1 text-center text-sm font-semibold text-neutral-700">
            {worker.name}
          </p>
        </div>

        {/* 인력 정보 */}
        <div className="min-w-0 flex-1">
          <div className="space-y-1">
            <p className="text-sm text-neutral-600">
              요청 업무 {worker.workType}
            </p>
            <p className="text-sm text-neutral-500">
              전체 경력 총 {worker.totalExperience}회 출근
            </p>
            <p className="text-sm text-neutral-500">
              매칭 점수 {worker.matchingScore}점
            </p>
          </div>

          {/* 우선 매칭 */}
          {worker.isPriorityMatch && (
            <div className="mt-2 flex items-center gap-1 text-blue-600">
              <span className="text-sm">🛡️</span>
              <span className="text-xs font-medium">우선 매칭</span>
            </div>
          )}
        </div>

        {/* 상세보기 버튼 */}
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(worker.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="text-lg">›</span>
          </button>
        )}
      </div>

      {/* 구분선 */}
      <div className="my-3 h-px bg-gray-200" />

      {/* 하단 섹션 - 평점 및 가격 */}
      <div className="flex items-center justify-between">
        {/* 평점 */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-yellow-500">★</span>
          <span className="text-sm text-neutral-500">
            {worker.rating} ({worker.reviewCount})
          </span>
        </div>

        {/* 가격과 선택 버튼 */}
        <div className="flex items-center gap-3">
          <p className="font-semibold text-blue-600">
            {worker.price.toLocaleString()}원
          </p>
          {/* 선택 체크박스 */}
          {onSelect && (
            <button
              onClick={() => onSelect(worker.id)}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded border-2 transition-colors",
                isSelected
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 hover:border-blue-400",
              )}
            >
              {isSelected && <span className="text-xs text-white">✓</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
