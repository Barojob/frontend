import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MapHandle } from "../../types/map";
import { Nullable } from "../../types/misc";
import LocationSearchBar from "../LocationSearchBar";
import Map from "../Map";

type LocationData = {
  address: string;
  latitude: number;
  longitude: number;
  placeName?: string;
};

type Props = {
  className?: string;
  onLocationConfirm: (location: LocationData) => void;
};

// 카카오맵 API 타입 정의
interface KakaoGeocoderResult {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
}

interface KakaoPlaceResult {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  category_name: string;
  phone: string;
}

const LocationSelector: React.FC<Props> = ({
  className = "",
  onLocationConfirm,
}) => {
  const navigate = useNavigate();
  const mapRef = useRef<Nullable<MapHandle>>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);

  // 페이지 로드 시 지도 중앙 위치 정보 가져오기
  useEffect(() => {
    // 지도가 로드되면 지도 중앙의 위치 정보 가져오기 (드래그 이벤트에서 처리됨)
  }, [mapRef.current?.isLoaded]);

  // 지도 드래그 이벤트 설정
  useEffect(() => {
    if (!mapRef.current?.map || !mapRef.current.isLoaded) return;

    const map = mapRef.current.map;
    const center = map.getCenter();

    // 지도 로딩 즉시 기본 위치 정보 설정
    const basicLocationData = {
      address: "위치 정보를 불러오는 중...",
      latitude: center.getLat(),
      longitude: center.getLng(),
      placeName: "선택된 위치",
    };
    setSelectedLocation(basicLocationData);

    // 지도 드래그가 끝났을 때 중앙 위치의 주소 가져오기
    const handleDragEnd = () => {
      const center = map.getCenter();
      updateLocationFromCoords(center.getLat(), center.getLng(), false);
    };

    // 드래그 종료 이벤트 등록
    kakao.maps.event.addListener(map, "dragend", handleDragEnd);

    // 지도 로드 완료 시 즉시 중앙 위치 정보 가져오기
    setTimeout(() => {
      handleDragEnd();
    }, 100);

    // cleanup 함수에서 이벤트 제거
    return () => {
      kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
    };
  }, [mapRef.current?.isLoaded]);

  // 좌표로부터 주소 정보 업데이트
  const updateLocationFromCoords = (
    lat: number,
    lng: number,
    isCurrentLocation?: boolean,
  ) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const places = new kakao.maps.services.Places();

    // 주소 검색
    geocoder.coord2Address(
      lng,
      lat,
      (result: KakaoGeocoderResult[], status: kakao.maps.services.Status) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
          const address = result[0].address.address_name;

          // 모든 경우에 주변 장소 검색
          places.keywordSearch(
            "건물 상가 지점 매장",
            (
              placeResults: KakaoPlaceResult[],
              placeStatus: kakao.maps.services.Status,
            ) => {
              let finalPlaceName = "선택된 위치";

              if (
                placeStatus === kakao.maps.services.Status.OK &&
                placeResults.length > 0
              ) {
                // 가장 가까운 장소 찾기
                let closestPlace = placeResults[0];
                let minDistance = Number.MAX_VALUE;

                for (const place of placeResults) {
                  const placeLat = parseFloat(place.y);
                  const placeLng = parseFloat(place.x);
                  const distance = Math.sqrt(
                    Math.pow(lat - placeLat, 2) + Math.pow(lng - placeLng, 2),
                  );

                  if (distance < minDistance) {
                    minDistance = distance;
                    closestPlace = place;
                  }
                }

                finalPlaceName = closestPlace.place_name;
              }

              const locationData = {
                address,
                latitude: lat,
                longitude: lng,
                placeName: finalPlaceName,
              };

              setSelectedLocation(locationData);

              // 현재 위치인 경우 currentLocation도 설정
              if (isCurrentLocation) {
                setCurrentLocation(locationData);
              }

              // 초기 로딩 완료
            },
            {
              location: new kakao.maps.LatLng(lat, lng),
              radius: 500,
              sort: kakao.maps.services.SortBy.DISTANCE,
            },
          );
        }
      },
    );
  };

  // 현재 위치 찾기
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (mapRef.current?.map) {
            // 지도 중심을 현재 위치로 이동하고 배율을 가깝게 설정
            const latlng = new kakao.maps.LatLng(lat, lng);
            mapRef.current.map.setCenter(latlng);
            mapRef.current.map.setLevel(2); // 더 가깝게 (숫자가 작을수록 가까움)

            // 주소 정보 업데이트
            updateLocationFromCoords(lat, lng, true);
          }
        },
        () => {
          alert("위치 정보를 가져올 수 없습니다.");
        },
      );
    } else {
      alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
    }
  };

  // 장소 검색 (keywordSearch 사용)
  const handleSearch = (keyword: string) => {
    if (!mapRef.current?.map) return;

    setIsSearching(true);
    const places = new kakao.maps.services.Places();

    places.keywordSearch(
      keyword,
      (data: KakaoPlaceResult[], status: kakao.maps.services.Status) => {
        setIsSearching(false);

        if (status === kakao.maps.services.Status.OK && data.length > 0) {
          const place = data[0];
          const lat = parseFloat(place.y);
          const lng = parseFloat(place.x);

          // 지도 중심을 검색된 위치로 이동
          const latlng = new kakao.maps.LatLng(lat, lng);
          if (mapRef.current?.map) {
            mapRef.current.map.setCenter(latlng);
            mapRef.current.map.setLevel(2); // 검색된 위치도 가깝게 표시

            // 검색된 장소는 이미 place_name이 있으므로 직접 설정
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              lng,
              lat,
              (
                result: KakaoGeocoderResult[],
                geocodeStatus: kakao.maps.services.Status,
              ) => {
                if (
                  geocodeStatus === kakao.maps.services.Status.OK &&
                  result.length > 0
                ) {
                  const address = result[0].address.address_name;
                  const locationData = {
                    address,
                    latitude: lat,
                    longitude: lng,
                    placeName: place.place_name, // 검색된 장소의 실제 이름 사용
                  };

                  setSelectedLocation(locationData);
                }
              },
            );
          }
        } else {
          alert("검색 결과가 없습니다.");
        }
      },
    );
  };

  // 위치 확정
  const handleLocationConfirm = () => {
    if (selectedLocation) {
      onLocationConfirm(selectedLocation);
    }
  };

  return (
    <div className={`relative h-screen ${className}`}>
      <button
        onClick={() => navigate("/")}
        className="fixed left-4 top-10 z-10 flex size-8 items-center justify-center rounded-full bg-white"
      >
        <HiOutlineArrowLeft className="size-5 text-zinc-600" />
      </button>

      {/* 지도 */}
      <div className="absolute inset-0">
        <Map ref={mapRef} className="size-full" />
      </div>

      {/* 중앙 고정 마커 */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-full">
        <div className="relative flex flex-col items-center">
          <div className="flex w-fit items-center justify-center rounded bg-zinc-800 px-2 py-1 text-white">
            <div className="text-sm">근무지</div>
          </div>
          <div className="h-3 w-0 border-l border-zinc-800"></div>
          <div className="size-1.5 rounded-full bg-zinc-800"></div>
        </div>
      </div>

      {/* 검색 바 */}
      <LocationSearchBar
        currentLocation={currentLocation}
        selectedLocation={selectedLocation}
        onCurrentLocationClick={handleCurrentLocationClick}
        onSearch={handleSearch}
        onLocationConfirm={handleLocationConfirm}
        isSearching={isSearching}
        className="fixed bottom-0 left-0 right-0"
      />
    </div>
  );
};

export default LocationSelector;
