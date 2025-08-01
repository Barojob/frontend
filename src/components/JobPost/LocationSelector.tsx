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

  // 디버깅을 위한 selectedLocation 변경 감지
  useEffect(() => {
    console.log("📍 selectedLocation 변경됨:", selectedLocation);
  }, [selectedLocation]);

  // 지도 로드 상태를 적극적으로 체크하는 polling effect
  useEffect(() => {
    let pollCount = 0;
    const maxPolls = 50; // 5초간 체크 (100ms * 50)

    const pollMapLoad = () => {
      pollCount++;
      console.log(`🔍 지도 로드 체크 ${pollCount}/${maxPolls}:`, {
        hasMapRef: !!mapRef.current,
        hasMap: !!mapRef.current?.map,
        isLoaded: mapRef.current?.isLoaded,
        isLoading: mapRef.current?.isLoading,
        isError: mapRef.current?.isError,
      });

      if (mapRef.current?.map && mapRef.current?.isLoaded) {
        console.log("✅ 지도 로드 확인됨! 위치 정보 업데이트 시작");

        const map = mapRef.current.map;
        const center = map.getCenter();

        if (!selectedLocation) {
          const basicLocationData = {
            address: "위치 정보를 불러오는 중...",
            latitude: center.getLat(),
            longitude: center.getLng(),
            placeName: "지도 중심 위치",
          };
          setSelectedLocation(basicLocationData);
          updateLocationFromCoords(center.getLat(), center.getLng(), false);
        }
        return; // 성공하면 polling 중단
      }

      if (pollCount < maxPolls) {
        setTimeout(pollMapLoad, 100);
      } else {
        console.log("❌ 지도 로드 타임아웃");
      }
    };

    // 초기 지도가 없을 때만 polling 시작
    if (!mapRef.current?.map || !mapRef.current?.isLoaded) {
      pollMapLoad();
    }
  }, []); // 한 번만 실행

  // 지도 로드 및 이벤트 설정 - 지속적으로 확인
  useEffect(() => {
    console.log("🔄 useEffect 실행 - mapRef.current:", mapRef.current);

    if (!mapRef.current?.map || !mapRef.current?.isLoaded) {
      console.log(
        "❌ 지도가 아직 로드되지 않음 - map:",
        !!mapRef.current?.map,
        "isLoaded:",
        mapRef.current?.isLoaded,
      );
      return;
    }

    console.log("✅ 지도 발견! isLoaded:", mapRef.current.isLoaded);

    const map = mapRef.current.map;
    const center = map.getCenter();

    console.log("🗺️ 지도 로드 완료, 중심 좌표:", {
      lat: center.getLat(),
      lng: center.getLng(),
    });

    // 이미 selectedLocation이 있다면 이벤트만 등록
    if (!selectedLocation) {
      // 지도 로딩 즉시 기본 위치 정보 설정
      const basicLocationData = {
        address: "위치 정보를 불러오는 중...",
        latitude: center.getLat(),
        longitude: center.getLng(),
        placeName: "지도 중심 위치",
      };
      setSelectedLocation(basicLocationData);

      // 지도 로드 완료 후 즉시 중앙 위치 정보 가져오기
      console.log("🚀 즉시 위치 정보 업데이트 시작");
      updateLocationFromCoords(center.getLat(), center.getLng(), false);
    }

    // 드래그 종료 이벤트 핸들러
    const handleDragEnd = () => {
      const center = map.getCenter();
      console.log("🖱️ 지도 드래그 종료, 새 중심:", {
        lat: center.getLat(),
        lng: center.getLng(),
      });
      updateLocationFromCoords(center.getLat(), center.getLng(), false);
    };

    // 드래그 종료 이벤트 등록
    kakao.maps.event.addListener(map, "dragend", handleDragEnd);

    // cleanup 함수에서 이벤트 제거
    return () => {
      kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
    };
  }, [mapRef.current?.isLoaded, mapRef.current?.map, selectedLocation]); // 의존성 배열 추가

  // 좌표로부터 주소 정보 업데이트
  const updateLocationFromCoords = (
    lat: number,
    lng: number,
    isCurrentLocation?: boolean,
  ) => {
    console.log("🔍 좌표에서 주소 검색 시작:", { lat, lng, isCurrentLocation });

    const geocoder = new kakao.maps.services.Geocoder();
    const places = new kakao.maps.services.Places();

    // 주소 검색
    geocoder.coord2Address(
      lng,
      lat,
      (result: KakaoGeocoderResult[], status: kakao.maps.services.Status) => {
        console.log("📮 주소 검색 결과:", { status, result });

        if (status === kakao.maps.services.Status.OK && result.length > 0) {
          const address = result[0].address.address_name;
          console.log("✅ 주소 발견:", address);

          // 모든 경우에 주변 장소 검색
          places.keywordSearch(
            "건물 상가 지점 매장",
            (
              placeResults: KakaoPlaceResult[],
              placeStatus: kakao.maps.services.Status,
            ) => {
              console.log("🏢 장소 검색 결과:", { placeStatus, placeResults });

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
                console.log("🎯 가장 가까운 장소:", finalPlaceName);
              }

              const locationData = {
                address,
                latitude: lat,
                longitude: lng,
                placeName: finalPlaceName,
              };

              console.log("📍 최종 위치 데이터:", locationData);
              setSelectedLocation(locationData);

              // 현재 위치인 경우 currentLocation도 설정
              if (isCurrentLocation) {
                setCurrentLocation(locationData);
                console.log("📍 현재 위치로도 설정됨");
              }
            },
            {
              location: new kakao.maps.LatLng(lat, lng),
              radius: 500,
              sort: kakao.maps.services.SortBy.DISTANCE,
            },
          );
        } else {
          console.log("❌ 주소 검색 실패:", status);
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
        onLocationConfirm={handleLocationConfirm}
        className="fixed bottom-0 left-0 right-0"
      />
    </div>
  );
};

export default LocationSelector;
