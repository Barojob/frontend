import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import type { KakaoGeocoderResult } from "../../types/kakao";
import { MapHandle } from "../../types/map";
import { Nullable } from "../../types/misc";
import LocationSearchBar from "../LocationSearchBar";
import LocationSearchScreen from "../LocationSearchScreen";
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

const LocationSelector: React.FC<Props> = ({
  className = "",
  onLocationConfirm,
}) => {
  const navigate = useNavigate();
  const mapRef = useRef<Nullable<MapHandle>>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  // 지도 중심 변경 핸들러 (통합)
  const handleMapCenterChange = (lat: number, lng: number) => {
    console.log("🗺️ 지도 중심 변경:", { lat, lng });

    // 주소 검색 및 selectedLocation 업데이트
    const geocoder = new kakao.maps.services.Geocoder();
    const places = new kakao.maps.services.Places();

    geocoder.coord2Address(
      lng,
      lat,
      (result: KakaoGeocoderResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
          const address = result[0].address.address_name;

          // 주변 장소 검색
          places.keywordSearch(
            "건물 상가 지점 매장",
            (placeResults: unknown[], placeStatus: string) => {
              let placeName = "선택된 위치";

              if (
                placeStatus === kakao.maps.services.Status.OK &&
                Array.isArray(placeResults) &&
                placeResults.length > 0
              ) {
                // 가장 가까운 장소 찾기
                let closestPlace = placeResults[0] as {
                  place_name: string;
                  x: string;
                  y: string;
                };
                let minDistance = Number.MAX_VALUE;

                for (const place of placeResults) {
                  const placeData = place as {
                    place_name: string;
                    x: string;
                    y: string;
                  };
                  const placeLat = parseFloat(placeData.y);
                  const placeLng = parseFloat(placeData.x);
                  const distance = Math.sqrt(
                    Math.pow(lat - placeLat, 2) + Math.pow(lng - placeLng, 2),
                  );

                  if (distance < minDistance) {
                    minDistance = distance;
                    closestPlace = place as {
                      place_name: string;
                      x: string;
                      y: string;
                    };
                  }
                }
                placeName = closestPlace.place_name;
              }

              const locationData = {
                address,
                latitude: lat,
                longitude: lng,
                placeName,
              };

              console.log("📍 새로운 위치 데이터:", locationData);
              setSelectedLocation(locationData);
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

  // 검색 화면에서 위치 선택 핸들러
  const handleLocationSelect = (location: LocationData) => {
    console.log("🎯 검색에서 위치 선택됨:", location);
    setSelectedLocation(location);
    setShowSearchScreen(false);

    // 지도 중심 이동
    const applyLocationToMap = () => {
      if (mapRef.current?.map && mapRef.current?.isLoaded) {
        console.log("🗺️ 지도에 위치 적용:", location);
        const latlng = new kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        );
        mapRef.current.map.setCenter(latlng);
        mapRef.current.map.setLevel(3);
      } else {
        console.log("⏳ 지도가 아직 로드되지 않음, 500ms 후 재시도");
        setTimeout(applyLocationToMap, 500);
      }
    };

    applyLocationToMap();
  };

  // 검색 화면 열기
  const handleSearchClick = () => {
    setShowSearchScreen(true);
  };

  // 검색 화면 닫기
  const handleSearchClose = () => {
    setShowSearchScreen(false);
  };

  // 디버깅을 위한 selectedLocation 변경 감지
  useEffect(() => {
    console.log("📍 selectedLocation 변경됨:", selectedLocation);
  }, [selectedLocation]);

  // selectedLocation이 변경될 때 지도 중심 이동 useEffect 제거

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
          handleMapCenterChange(center.getLat(), center.getLng());
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

    // 드래그 종료 이벤트 핸들러 (항상 등록)
    const handleDragEnd = () => {
      console.log("🖱️ 드래그 이벤트 발생!");
      const center = map.getCenter();
      console.log("🖱️ 지도 드래그 종료, 새 중심:", {
        lat: center.getLat(),
        lng: center.getLng(),
      });
      handleMapCenterChange(center.getLat(), center.getLng());
    };

    // 드래그 종료 이벤트 등록 (항상 등록)
    console.log("📌 드래그 이벤트 등록됨");
    kakao.maps.event.addListener(map, "dragend", handleDragEnd);

    // cleanup 함수에서 이벤트 제거
    return () => {
      kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
    };
  }, [mapRef.current?.isLoaded, mapRef.current?.map]); // selectedLocation 제거

  // 드래그 이벤트 등록 (별도 useEffect)
  useEffect(() => {
    if (!mapRef.current?.map || !mapRef.current?.isLoaded) {
      console.log("⏳ 드래그 이벤트 등록 대기 - 지도가 아직 로드되지 않음");
      return;
    }

    const map = mapRef.current.map;
    console.log("✅ 지도 로드 완료, 드래그 이벤트 등록 시작");

    // 드래그 종료 이벤트 핸들러
    const handleDragEnd = () => {
      console.log("🖱️ 드래그 이벤트 발생!");
      const center = map.getCenter();
      console.log("🖱️ 지도 드래그 종료, 새 중심:", {
        lat: center.getLat(),
        lng: center.getLng(),
      });
      handleMapCenterChange(center.getLat(), center.getLng());
    };

    // 드래그 종료 이벤트 등록
    console.log("📌 드래그 이벤트 등록됨");
    kakao.maps.event.addListener(map, "dragend", handleDragEnd);

    // cleanup 함수에서 이벤트 제거
    return () => {
      console.log("🧹 드래그 이벤트 제거됨");
      kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
    };
  }, [mapRef.current?.isLoaded, mapRef.current?.map]); // map이 로드될 때마다 등록

  // 드래그 이벤트 등록 확인 (추가 보장)
  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 10;

    const checkDragEvent = () => {
      checkCount++;
      console.log(`🔍 드래그 이벤트 확인 ${checkCount}/${maxChecks}`);

      if (mapRef.current?.map && mapRef.current?.isLoaded) {
        console.log("✅ 지도 로드 확인됨, 드래그 이벤트 재등록");

        const map = mapRef.current.map;

        // 기존 이벤트 제거
        kakao.maps.event.removeListener(map, "dragend", () => {});

        // 새 이벤트 등록
        const handleDragEnd = () => {
          console.log("🖱️ 드래그 이벤트 발생!");
          const center = map.getCenter();
          console.log("🖱️ 지도 드래그 종료, 새 중심:", {
            lat: center.getLat(),
            lng: center.getLng(),
          });
          handleMapCenterChange(center.getLat(), center.getLng());
        };

        kakao.maps.event.addListener(map, "dragend", handleDragEnd);
        console.log("📌 드래그 이벤트 재등록 완료");
        return;
      }

      if (checkCount < maxChecks) {
        setTimeout(checkDragEvent, 500);
      }
    };

    // 1초 후 확인 시작
    setTimeout(checkDragEvent, 1000);
  }, [mapRef.current?.isLoaded]);

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
            handleMapCenterChange(lat, lng);
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

  // 검색 화면이 열려있을 때 LocationSearchScreen 렌더링
  if (showSearchScreen) {
    return (
      <LocationSearchScreen
        onClose={handleSearchClose}
        onLocationSelect={handleLocationSelect}
      />
    );
  }

  // 기본 지도 화면
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
        currentLocation={null} // currentLocation 상태 제거
        selectedLocation={selectedLocation}
        onCurrentLocationClick={handleCurrentLocationClick}
        onLocationConfirm={handleLocationConfirm}
        onSearchClick={handleSearchClick}
        className="fixed bottom-0 left-0 right-0"
      />
    </div>
  );
};

export default LocationSelector;
