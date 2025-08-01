import React from "react";
import { IoMdLocate } from "react-icons/io";
import { cn } from "../utils/classname";
import Button from "./Button";
import Chip from "./Chip";

type LocationData = {
  address: string;
  latitude: number;
  longitude: number;
  placeName?: string;
};

type Props = {
  currentLocation?: LocationData | null;
  selectedLocation?: LocationData | null;
  onCurrentLocationClick: () => void;
  onLocationConfirm: () => void;
  onSearchClick?: () => void; // 검색 클릭 핸들러 추가
  className?: string;
};

const LocationSearchBar: React.FC<Props> = ({
  currentLocation,
  selectedLocation,
  onCurrentLocationClick,
  onLocationConfirm,
  onSearchClick,
  className,
}) => {
  // 표시할 위치: 선택된 위치가 있으면 선택된 위치, 없으면 현재 위치
  const displayLocation = selectedLocation || currentLocation;

  // 디버깅을 위한 로그
  console.log("🏠 LocationSearchBar - displayLocation:", displayLocation);
  console.log("🏠 LocationSearchBar - selectedLocation:", selectedLocation);
  console.log("🏠 LocationSearchBar - currentLocation:", currentLocation);

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-50 rounded-t-[20px] border-t-2 border-gray-200 bg-white shadow-lg",
        className,
      )}
    >
      <div className="px-6 py-5">
        <div className="mb-3 text-xl font-bold text-neutral-600">
          어디에서 일할까요?
        </div>
        {/* 위치 표시 - 클릭 가능하도록 수정 */}
        <div className="">
          <button
            onClick={onSearchClick}
            className="-m-2 mb-1 flex w-full gap-4 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
          >
            <div className="mt-2 size-2.5 rounded-full bg-blue-500"></div>
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-600">
                {displayLocation?.placeName || "선택된 위치"}
              </span>
              <span className="text-xs text-neutral-400">
                {displayLocation?.address || "지도에서 위치를 확인하세요"}
              </span>
            </div>
          </button>
        </div>
        <div className="mb-3 flex gap-2 border-t border-neutral-200 pt-3">
          <Chip className="rounded-full bg-neutral-100 px-2 text-xs text-neutral-400">
            회사
          </Chip>
          <Chip className="rounded-full bg-neutral-100 px-2 text-xs text-neutral-400">
            경기 포천시 중앙로 119번길 26
          </Chip>
          <Chip className="rounded-full bg-neutral-100 px-2 text-xs text-neutral-400">
            최근 기록
          </Chip>
        </div>

        {/* 근무지로 설정 버튼 */}
        <Button
          size="xl"
          theme="primary"
          onClick={onLocationConfirm}
          className="w-full"
        >
          근무지로 설정
        </Button>
      </div>

      {/* 현재 위치 버튼 (지도 위에 플로팅) */}
      <button
        onClick={onCurrentLocationClick}
        className="-top-13 absolute right-3 flex items-center rounded-full border border-gray-200 bg-white p-2 shadow-md"
      >
        <IoMdLocate className="size-6 text-blue-600" />
      </button>
    </div>
  );
};

export default LocationSearchBar;
