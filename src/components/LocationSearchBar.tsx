import React, { useEffect, useState } from "react";
import { IoMdLocate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { cn } from "../utils/classname";
import Button from "./Button";
import Chip from "./Chip";

type LocationData = {
  address: string;
  latitude: number;
  longitude: number;
  placeName?: string;
};

type RecentSearchData = {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
};

type Props = {
  currentLocation?: LocationData | null;
  selectedLocation?: LocationData | null;
  onCurrentLocationClick: () => void;
  onLocationConfirm: () => void;
  onSearchClick?: () => void; // 검색 클릭 핸들러 추가
  onLocationSelect?: (location: LocationData) => void; // 위치 선택 핸들러 추가
  className?: string;
};

const LocationSearchBar: React.FC<Props> = ({
  currentLocation,
  selectedLocation,
  onCurrentLocationClick,
  onLocationConfirm,
  onSearchClick,
  onLocationSelect,
  className,
}) => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);

  // 최근 검색어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("recentLocationSearches");
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // 기존 string 배열 형태의 데이터를 새로운 구조로 마이그레이션
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          if (typeof parsedData[0] === "string") {
            // 기존 string 배열 형태인 경우 빈 배열로 초기화
            setRecentSearches([]);
            localStorage.removeItem("recentLocationSearches");
          } else {
            // 새로운 구조인 경우 그대로 사용
            setRecentSearches(parsedData);
          }
        } else {
          setRecentSearches([]);
        }
      } catch (error) {
        console.error("최근 검색어 데이터 파싱 오류:", error);
        setRecentSearches([]);
      }
    }
  }, []);

  // 표시할 위치: 선택된 위치가 있으면 선택된 위치, 없으면 현재 위치
  const displayLocation = selectedLocation || currentLocation;

  // 스마트 주소 표시: placeName이 주소와 동일하거나 주소를 포함하면 하단 주소 숨김
  const shouldShowAddress = (() => {
    if (!displayLocation?.placeName || !displayLocation?.address) {
      return true; // placeName이나 address가 없으면 주소 표시
    }

    const placeName = displayLocation.placeName.toLowerCase();
    const address = displayLocation.address.toLowerCase();

    // placeName이 주소와 동일하거나 주소를 포함하면 false
    if (
      placeName === address ||
      address.includes(placeName) ||
      placeName.includes(address)
    ) {
      return false;
    }

    // placeName이 주소 형태인지 확인 (시, 구, 동, 번지 등 포함)
    const addressPatterns = [
      /시$/,
      /구$/,
      /동$/,
      /번지$/,
      /로$/,
      /길$/,
      /읍$/,
      /면$/,
      /\d+번지/,
      /\d+로/,
      /\d+길/,
      /\d+동/,
    ];

    const isAddressFormat = addressPatterns.some((pattern) =>
      pattern.test(placeName),
    );
    if (isAddressFormat) {
      return false;
    }

    return true; // 그 외의 경우 주소 표시
  })();

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (searchData: RecentSearchData) => {
    console.log("🏠 최근 검색어 클릭:", searchData);

    if (onLocationSelect) {
      const locationData: LocationData = {
        address: searchData.address,
        latitude: searchData.latitude,
        longitude: searchData.longitude,
        placeName: searchData.placeName,
      };

      console.log("🏠 최근 검색어로 위치 선택:", locationData);
      onLocationSelect(locationData);
    } else if (onSearchClick) {
      onSearchClick();
    }
  };

  // 디버깅을 위한 로그
  console.log("🏠 LocationSearchBar - displayLocation:", displayLocation);
  console.log("🏠 LocationSearchBar - shouldShowAddress:", shouldShowAddress);
  console.log("🏠 LocationSearchBar - selectedLocation:", selectedLocation);
  console.log("🏠 LocationSearchBar - currentLocation:", currentLocation);
  console.log("🏠 LocationSearchBar - recentSearches:", recentSearches);

  const handleLocationConfirm = () => {
    if (displayLocation) {
      // URL 쿼리 파라미터로 주소 정보 전달
      const searchParams = new URLSearchParams();
      searchParams.set("address", displayLocation.address);
      searchParams.set("latitude", displayLocation.latitude.toString());
      searchParams.set("longitude", displayLocation.longitude.toString());
      if (displayLocation.placeName) {
        searchParams.set("placeName", displayLocation.placeName);
      }

      // job-posting 페이지로 이동하면서 쿼리 파라미터 전달
      navigate(`/job-posting?${searchParams.toString()}`);
    } else {
      // 위치 정보가 없으면 기본 동작
      onLocationConfirm();
    }
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-50 rounded-t-[20px] border-t-2 border-gray-200 bg-white pb-3 shadow-lg",
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
              <span
                className={cn(
                  "text-xs text-neutral-400",
                  !shouldShowAddress && "invisible",
                )}
              >
                {displayLocation?.address || "지도에서 위치를 확인하세요"}
              </span>
            </div>
          </button>
        </div>
        <div className="mb-3 flex gap-2 overflow-x-auto border-t border-neutral-200 pt-3">
          {recentSearches.length > 0 ? (
            recentSearches.slice(0, 3).map((search, index) => (
              <Chip
                key={index}
                className="cursor-pointer text-nowrap rounded-full bg-neutral-100 px-2 text-xs text-neutral-400"
                onClick={() => handleRecentSearchClick(search)}
              >
                {search.placeName}
              </Chip>
            ))
          ) : (
            <>
              <Chip className="rounded-full bg-neutral-100 px-2 text-xs text-neutral-400">
                최근 기록
              </Chip>
            </>
          )}
        </div>

        {/* 근무지로 설정 버튼 */}
        <Button
          size="xl"
          theme="primary"
          onClick={handleLocationConfirm}
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
