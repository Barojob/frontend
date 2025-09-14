import PriorityMatchIcon from "@/svgs/PriorityMatchIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import StarIcon from "@/svgs/StarIcon";
import VerifiedIcon from "@/svgs/VerifiedIcon";
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
  const handleCardClick = () => {
    onSelect?.(worker.id);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    onViewDetails?.(worker.id);
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-[0.625rem] border border-neutral-200 bg-white p-4 transition-all duration-300 hover:shadow-md",
        isSelected &&
          "border-blue-500 shadow-[0_0_10px_0_rgba(36,122,242,0.2)]",
        className,
        additionalClassName,
      )}
      onClick={handleCardClick}
    >
      {/* 추천 배지 */}
      {worker.isRecommended && (
        <div className="absolute -top-3.5 left-3">
          <VerifiedIcon />
        </div>
      )}

      {/* 상단 섹션 - 기본 정보 */}
      <div className="flex items-start gap-7 px-2.5">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <ProfileIcon />
          <p className="mt-1 text-center text-sm font-semibold text-neutral-700">
            {worker.name}
          </p>
        </div>

        {/* 인력 정보 */}
        <div className="min-w-0 flex-1">
          <div className="space-y-1">
            <p className="flex items-center gap-3 text-xs font-medium text-gray-500">
              요청 업무
              <span className="text-neutral-600">{worker.workType}</span>
            </p>
            <p className="flex items-center gap-3 text-xs font-medium text-gray-500">
              전체 경력
              <span className="text-neutral-600">
                총 {worker.totalExperience}회 출근
              </span>
            </p>
            <p className="flex items-center gap-3 text-xs font-medium text-gray-500">
              매칭 점수
              <span className="text-neutral-600">{worker.matchingScore}점</span>
            </p>
          </div>
        </div>

        {/* 상세보기 버튼 */}
        {onViewDetails && (
          <button
            onClick={handleViewDetailsClick}
            className="text-gray-400 hover:text-gray-600"
          >
            <RightArrowIcon />
          </button>
        )}
      </div>

      {/* 구분선 */}
      <div className="my-2 h-px bg-neutral-200" />

      {/* 하단 섹션 - 평점 및 가격 */}
      <div className="flex items-center justify-between">
        {/* 왼쪽: 평점과 우선 매칭 */}
        <div className="flex items-center gap-3">
          {/* 평점 */}
          <div className="flex items-center gap-1">
            <StarIcon />
            <p className="flex items-center text-xs font-bold text-neutral-600">
              {worker.rating}{" "}
              <span className="text-gray-500">({worker.reviewCount})</span>
            </p>
          </div>
          {/* 우선 매칭 */}
          {worker.isPriorityMatch && (
            <div className="flex items-center gap-1 text-blue-600">
              <PriorityMatchIcon />
              <span className="text-xs font-medium">우선 매칭</span>
            </div>
          )}
        </div>

        {/* 오른쪽: 가격과 선택 버튼 */}
        <div className="flex items-center gap-3">
          <p className="font-bold text-blue-600">
            {worker.price.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
