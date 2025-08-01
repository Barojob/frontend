import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import type { KakaoPlaceSearchResult } from "../types/kakao";
import Input from "./Input/Input";
import NavigationHeader from "./NavigationHeader/NavigationHeader";

type LocationData = {
  address: string;
  latitude: number;
  longitude: number;
  placeName?: string;
};

type Props = {
  onClose: () => void;
  onLocationSelect: (location: LocationData) => void;
};

const LocationSearchScreen: React.FC<Props> = ({
  onClose,
  onLocationSelect,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoPlaceSearchResult[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 최근 검색어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("recentLocationSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 검색어 디바운싱 처리
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchPlaces(searchKeyword);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  // 카카오맵 API 장소 검색
  const searchPlaces = (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // 카카오맵 Places 서비스 객체 생성
    const places = new kakao.maps.services.Places();

    // 현재 위치를 가져와서 검색 옵션에 포함
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          places.keywordSearch(
            keyword,
            (data: KakaoPlaceSearchResult[], status: string) => {
              setIsSearching(false);

              if (status === kakao.maps.services.Status.OK) {
                setSearchResults(data);
              } else {
                setSearchResults([]);
                console.log("장소 검색 실패:", status);
              }
            },
            {
              location: new kakao.maps.LatLng(lat, lng),
              radius: 20000, // 20km 반경
              sort: kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
            },
          );
        },
        () => {
          // 위치 정보를 가져올 수 없는 경우 기본 검색
          places.keywordSearch(
            keyword,
            (data: KakaoPlaceSearchResult[], status: string) => {
              setIsSearching(false);

              if (status === kakao.maps.services.Status.OK) {
                setSearchResults(data);
              } else {
                setSearchResults([]);
                console.log("장소 검색 실패:", status);
              }
            },
          );
        },
      );
    } else {
      // Geolocation을 지원하지 않는 경우 기본 검색
      places.keywordSearch(
        keyword,
        (data: KakaoPlaceSearchResult[], status: string) => {
          setIsSearching(false);

          if (status === kakao.maps.services.Status.OK) {
            setSearchResults(data);
          } else {
            setSearchResults([]);
            console.log("장소 검색 실패:", status);
          }
        },
      );
    }
  };

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  // 검색 결과 선택 핸들러
  const handleResultSelect = (result: KakaoPlaceSearchResult) => {
    const locationData: LocationData = {
      address: result.road_address_name || result.address_name,
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      placeName: result.place_name,
    };

    // 최근 검색어에 추가
    const newRecentSearches = [
      result.place_name,
      ...recentSearches.filter((item) => item !== result.place_name),
    ].slice(0, 5); // 최대 5개까지만 저장

    setRecentSearches(newRecentSearches);
    localStorage.setItem(
      "recentLocationSearches",
      JSON.stringify(newRecentSearches),
    );

    onLocationSelect(locationData);
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white px-4 py-2">
      {/* 헤더 */}
      <NavigationHeader title="" onBack={onClose} />

      {/* 검색 입력 */}
      <div className="mt-4 flex items-center rounded-2xl bg-neutral-200 px-5">
        <div className="mr-2 size-3 rounded-full bg-blue-500"></div>
        <Input
          value={searchKeyword}
          onValueChange={setSearchKeyword}
          placeholder="지역, 건물명을 검색해보세요"
          className="w-full bg-transparent text-neutral-600 focus:outline-none focus:ring-0"
          autoFocus
        />
      </div>

      {/* 검색 결과 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 최근 검색어 (검색어가 없을 때만 표시) */}
        {!searchKeyword && recentSearches.length > 0 && (
          <div className="p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-600">
              최근 검색
            </h3>
            <div className="space-y-2">
              {recentSearches.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(keyword)}
                  className="flex w-full items-center rounded-lg p-3 text-left transition-colors hover:bg-gray-50"
                >
                  <HiOutlineLocationMarker className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-gray-700">{keyword}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 검색 중 표시 */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">검색 중...</span>
          </div>
        )}

        {/* 검색 결과 */}
        {!isSearching && searchKeyword && searchResults.length > 0 && (
          <div className="p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-600">
              검색 결과 ({searchResults.length}개)
            </h3>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultSelect(result)}
                  className="flex w-full items-start rounded-lg p-3 text-left transition-colors hover:bg-gray-50"
                >
                  <HiOutlineLocationMarker className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="truncate font-medium text-gray-900">
                        {result.place_name}
                      </div>
                      {result.distance && (
                        <span className="ml-2 flex-shrink-0 text-xs font-medium text-blue-600">
                          {parseInt(result.distance) < 1000
                            ? `${result.distance}m`
                            : `${(parseInt(result.distance) / 1000).toFixed(1)}km`}
                        </span>
                      )}
                    </div>
                    <div className="truncate text-sm text-gray-500">
                      {result.road_address_name || result.address_name}
                    </div>
                    {result.category_name && (
                      <div className="mt-1 text-xs text-gray-400">
                        {result.category_name}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 검색 결과 없음 */}
        {!isSearching && searchKeyword && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <HiOutlineLocationMarker className="mb-3 h-12 w-12 text-gray-300" />
            <p className="text-center text-gray-500">
              &lsquo;<span className="font-medium">{searchKeyword}</span>
              &rsquo;에 대한
              <br />
              검색 결과가 없습니다.
            </p>
          </div>
        )}

        {/* 기본 상태 (검색어도 없고 최근 검색어도 없을 때) */}
        {!searchKeyword && recentSearches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <IoSearch className="mb-3 h-12 w-12 text-gray-300" />
            <p className="text-center text-gray-500">
              지역, 건물명을 검색해서
              <br />
              원하는 위치를 찾아보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearchScreen;
