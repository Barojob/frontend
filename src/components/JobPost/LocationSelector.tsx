import LocationSearchBar from "@/components/LocationSearchBar";
import LocationSearchScreen from "@/components/LocationSearchScreen";
import Map from "@/components/Map";
import type { KakaoGeocoderResult } from "@/types/kakao";
import { MapHandle } from "@/types/map";
import { Nullable } from "@/types/misc";
import { Geolocation } from "@capacitor/geolocation";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

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

  const [currentGeoLocation, setCurrentGeoLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  // 지도 중심 변경 핸들러 - 하이브리드 검색으로 빠른 응답
  const handleMapCenterChange = (lat: number, lng: number) => {
    console.log("🗺️ 지도 중심 변경:", { lat, lng });

    if (
      typeof window === "undefined" ||
      typeof kakao === "undefined" ||
      !kakao.maps ||
      !kakao.maps.services
    ) {
      console.log("⚠️ kakao 서비스가 로드되지 않아 폴백 적용");
      setSelectedLocation({
        address: "주소를 찾지 못했습니다",
        latitude: lat,
        longitude: lng,
        placeName: "지도 중심 위치",
      });
      return;
    }

    // 하이브리드 검색 시작 - 키워드와 카테고리를 동시에 검색
    startHybridSearch(lat, lng);
  };

  // 하이브리드 검색 - 키워드와 카테고리를 동시에 실행하여 빠른 응답
  const startHybridSearch = (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const places = new kakao.maps.services.Places();

    console.log("🔍 하이브리드 검색 시작:", { lat, lng });

    // 역지오코딩으로 주소 가져오기
    geocoder.coord2Address(
      lng,
      lat,
      (result: KakaoGeocoderResult[], status: string) => {
        console.log("📍 역지오코딩 결과:", { status, result });

        if (status !== kakao.maps.services.Status.OK || !result.length) {
          console.log("❌ 역지오코딩 실패, 좌표 기반 폴백");
          setSelectedLocation({
            address: "주소를 찾지 못했습니다",
            latitude: lat,
            longitude: lng,
            placeName: `위치 (${lat.toFixed(6)}, ${lng.toFixed(6)})`,
          });
          return;
        }

        const address = result[0].address.address_name;
        const buildingName = result[0].road_address?.building_name;
        console.log("✅ 주소 찾음:", address, "빌딩명:", buildingName);

        // 즉시 주소 정보로 초기 설정 (빠른 응답) - 빌딩명이 있으면 우선 사용
        setSelectedLocation({
          address,
          latitude: lat,
          longitude: lng,
          placeName: buildingName || address,
        });

        // 병렬로 키워드와 카테고리 검색 실행
        const searchPromises = [
          searchByKeywords(places, lat, lng, address),
          searchByCategories(places, lat, lng, address),
        ];

        // 가장 빠른 결과를 사용하여 업데이트
        Promise.race(searchPromises).then((bestResult) => {
          if (bestResult) {
            console.log("🏆 최적 결과 선택:", bestResult);
            setSelectedLocation(bestResult);
          }
        });
      },
    );
  };

  // 검색 정확도 상수 (더 촘촘하게)
  const SEARCH_RADIUS_M = 20; // 20m
  const DIST_THRESHOLD_DEG = 0.0001; // 약 11m

  // 키워드 기반 검색
  const searchByKeywords = async (
    places: kakao.maps.services.Places,
    lat: number,
    lng: number,
    address: string,
  ): Promise<LocationData | null> => {
    const searchKeywords = [
      // 공공기관/교육/문화 우선
      "주민센터",
      "행정복지센터",
      "동사무소",
      "정부청사",
      "도서관",
      "학교",
      // 금융/의료
      "은행",
      "병원",
      "약국",
      // 치안/소방/우편
      "경찰서",
      "지구대",
      "소방서",
      "우체국",
      // 생활편의/유통/식음료
      "편의점",
      "마트",
      "카페",
      "음식점",
      // 기타
      "부동산",
      "문화센터",
      "건물",
      // 최후순위: 포괄적 키워드
      "상점",
      "매장",
      "업소",
    ];

    for (const keyword of searchKeywords) {
      try {
        const result = await searchKeyword(places, keyword, lat, lng);
        if (result) {
          console.log(`✅ 키워드 "${keyword}"로 장소 발견:`, result.placeName);
          return {
            address,
            latitude: lat,
            longitude: lng,
            placeName: result.placeName,
          };
        }
      } catch (error) {
        console.log(`❌ 키워드 "${keyword}" 검색 실패:`, error);
      }
    }

    return null;
  };

  // 카테고리 기반 검색 (병렬)
  const searchByCategories = async (
    places: kakao.maps.services.Places,
    lat: number,
    lng: number,
    address: string,
  ): Promise<LocationData | null> => {
    const categories: KakaoCategory[] = [
      // 공공기관/금융/의료 최우선
      "PO3", // 공공기관
      "BK9", // 은행
      "HP8", // 병원
      "PM9", // 약국
      // 생활편의/식음료
      "CS2", // 편의점
      "CE7", // 카페
      "FD6", // 음식점
      // 기타 시설
      "CT1", // 문화시설
      "AD5", // 건물/시설
      "AG2", // 부동산
      "SW8", // 쇼핑
    ];

    // 모든 카테고리를 병렬 검색 후 가장 가까운 결과 채택
    const results = await Promise.all(
      categories.map((cat) =>
        searchCategory(places, cat, lat, lng).then((r) => ({ cat, r })),
      ),
    );

    // 가장 가까운 후보 선택 (30m 이내만 승인)
    let best: { name: string; distance: number } | null = null;
    for (const item of results) {
      if (item.r) {
        const distance =
          (item.r as unknown as { distance: number }).distance ?? 0;
        const name = (item.r as unknown as { placeName: string }).placeName;
        if (!best || distance < best.distance) {
          best = { name, distance };
        }
      }
    }

    if (best && best.distance < DIST_THRESHOLD_DEG) {
      // 약 22~25m
      return {
        address,
        latitude: lat,
        longitude: lng,
        placeName: best.name,
      };
    }

    return null;
  };

  // 개별 키워드 검색 (Promise 기반)
  const searchKeyword = (
    places: kakao.maps.services.Places,
    keyword: string,
    lat: number,
    lng: number,
  ): Promise<{ placeName: string; distance: number } | null> => {
    return new Promise((resolve) => {
      places.keywordSearch(
        keyword,
        (placeResults: unknown[], placeStatus: string) => {
          if (
            placeStatus === kakao.maps.services.Status.OK &&
            Array.isArray(placeResults) &&
            placeResults.length > 0
          ) {
            const closest = findClosestPlace(placeResults, lat, lng);
            if (closest && closest.distance < DIST_THRESHOLD_DEG) {
              resolve({
                placeName: closest.place_name,
                distance: closest.distance,
              });
              return;
            }
          }
          resolve(null);
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: SEARCH_RADIUS_M,
          sort: kakao.maps.services.SortBy.DISTANCE,
        },
      );
    });
  };

  // 개별 카테고리 검색 (Promise 기반)
  type KakaoCategory =
    | "AD5"
    | "FD6"
    | "CE7"
    | "HP8"
    | "PM9"
    | "CS2"
    | "SW8"
    | "PO3" // 공공기관
    | "CT1" // 문화시설
    | "BK9" // 은행
    | "AG2"; // 부동산

  const searchCategory = (
    places: kakao.maps.services.Places,
    category: KakaoCategory,
    lat: number,
    lng: number,
  ): Promise<{ placeName: string; distance: number } | null> => {
    return new Promise((resolve) => {
      places.categorySearch(
        category,
        (placeResults: unknown[], placeStatus: string) => {
          if (
            placeStatus === kakao.maps.services.Status.OK &&
            Array.isArray(placeResults) &&
            placeResults.length > 0
          ) {
            const closest = findClosestPlace(placeResults, lat, lng);
            if (closest && closest.distance < DIST_THRESHOLD_DEG) {
              resolve({
                placeName: closest.place_name,
                distance: closest.distance,
              });
              return;
            }
          }
          resolve(null);
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: SEARCH_RADIUS_M,
          sort: kakao.maps.services.SortBy.DISTANCE,
        },
      );
    });
  };

  // 가장 가까운 장소 찾기
  const findClosestPlace = (
    placeResults: unknown[],
    lat: number,
    lng: number,
  ) => {
    let closestPlace = null;
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
        closestPlace = {
          place_name: placeData.place_name,
          distance,
        };
      }
    }

    return closestPlace;
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
  useEffect(() => {
    // currentGeoLocation에 값이 있고, 지도가 준비되었을 때만 실행
    if (currentGeoLocation && mapRef.current?.map && mapRef.current?.isLoaded) {
      console.log(
        "✅ 현재 위치 state 변경 감지! 지도를 이동합니다.",
        currentGeoLocation,
      );

      const { lat, lng } = currentGeoLocation;

      // 지도 중심 이동
      try {
        if (
          typeof kakao === "undefined" ||
          !kakao.maps ||
          !mapRef.current?.map
        ) {
          throw new Error("kakao 또는 map 인스턴스 없음");
        }
        const latlng = new kakao.maps.LatLng(lat, lng);
        // 부드러운 이동으로 시각적 피드백 강화
        mapRef.current.map.panTo(latlng);
        // 약간 확대하여 현재 위치 강조
        mapRef.current.map.setLevel(2);
        // 레이아웃 보정
        if (typeof mapRef.current.relayout === "function") {
          setTimeout(() => mapRef.current?.relayout(), 0);
        }
      } catch (err) {
        console.error("지도 이동 중 오류:", err);
      }

      // 주소 정보 업데이트
      try {
        handleMapCenterChange(lat, lng);
      } catch (e) {
        console.error("주소 업데이트 중 오류:", e);
      }

      // 한 번 사용한 위치 정보는 초기화 (선택사항이지만 권장)
      setCurrentGeoLocation(null);
    }
  }, [currentGeoLocation, mapRef.current?.isLoaded]);

  // 위치 확정
  const handleLocationConfirm = () => {
    if (selectedLocation) {
      onLocationConfirm(selectedLocation);
    }
  };

  // 현재 위치 찾기
  const handleCurrentLocationClick = async () => {
    try {
      await Geolocation.requestPermissions();
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      // 한국 범위(대략) 밖이면 서울 시청 좌표로 폴백
      const rawLat = position.coords.latitude;
      const rawLng = position.coords.longitude;
      const isInKorea = (lat: number, lng: number) =>
        lat >= 33 && lat <= 38 && lng >= 124 && lng <= 132;

      const next = isInKorea(rawLat, rawLng)
        ? { lat: rawLat, lng: rawLng }
        : { lat: 37.5843, lng: 126.9255 };

      if (!isInKorea(rawLat, rawLng)) {
        console.log("🌏 현재 좌표가 한국 범위를 벗어나 서울로 폴백합니다.", {
          rawLat,
          rawLng,
        });
        alert("시뮬레이터 기본 위치가 해외로 설정되어 있어 서울로 이동합니다.");
      }

      // 위치 정보를 state에 저장
      setCurrentGeoLocation(next);
    } catch (error) {
      console.error("위치 정보를 가져오는 데 실패했습니다.", error);
      alert(
        "위치 정보를 가져올 수 없습니다. 기기의 위치 서비스가 켜져 있는지 확인해주세요.",
      );
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
        className="top-15 fixed left-4 z-10 flex size-9 items-center justify-center rounded-full bg-white"
      >
        <HiOutlineArrowLeft className="size-6 text-zinc-600" />
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
        onLocationSelect={handleLocationSelect} // 최근 검색어 클릭 시 위치 선택
        className="fixed bottom-0 left-0 right-0"
      />
    </div>
  );
};

export default LocationSelector;
