import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";
import { cn } from "../utils/classname";

// 거리 계산 함수 (Haversine formula)
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 더미 지역 데이터 (명지대학교 자연캠퍼스 주변)
const FALLBACK_AREA_BOUNDARIES: {
  [key: string]: { lat: number; lng: number }[];
} = {
  "경기도 용인시 처인구 남동1리": [
    { lat: 37.2229, lng: 127.1876 },
    { lat: 37.2245, lng: 127.1891 },
    { lat: 37.226, lng: 127.1906 },
    { lat: 37.227, lng: 127.1926 },
    { lat: 37.226, lng: 127.1946 },
    { lat: 37.224, lng: 127.1956 },
    { lat: 37.2215, lng: 127.1951 },
    { lat: 37.2195, lng: 127.1941 },
    { lat: 37.218, lng: 127.1926 },
    { lat: 37.217, lng: 127.1906 },
    { lat: 37.218, lng: 127.1886 },
    { lat: 37.22, lng: 127.1871 },
    { lat: 37.222, lng: 127.1866 },
  ],
  "경기도 용인시 처인구 김량장동": [
    { lat: 37.218, lng: 127.1976 },
    { lat: 37.2195, lng: 127.1991 },
    { lat: 37.221, lng: 127.2006 },
    { lat: 37.222, lng: 127.2026 },
    { lat: 37.221, lng: 127.2046 },
    { lat: 37.219, lng: 127.2056 },
    { lat: 37.2165, lng: 127.2051 },
    { lat: 37.2145, lng: 127.2041 },
    { lat: 37.213, lng: 127.2026 },
    { lat: 37.212, lng: 127.2006 },
    { lat: 37.213, lng: 127.1986 },
    { lat: 37.215, lng: 127.1971 },
    { lat: 37.217, lng: 127.1966 },
  ],
  "경기도 용인시 처인구 역북동": [
    { lat: 37.213, lng: 127.2051 },
    { lat: 37.2145, lng: 127.2066 },
    { lat: 37.2165, lng: 127.2081 },
    { lat: 37.218, lng: 127.2096 },
    { lat: 37.217, lng: 127.2116 },
    { lat: 37.215, lng: 127.2121 },
    { lat: 37.213, lng: 127.2116 },
    { lat: 37.211, lng: 127.2106 },
    { lat: 37.2095, lng: 127.2091 },
    { lat: 37.2085, lng: 127.2076 },
    { lat: 37.209, lng: 127.2061 },
    { lat: 37.211, lng: 127.2051 },
  ],
  "경기도 용인시 처인구 마평동": [
    { lat: 37.2265, lng: 127.2086 },
    { lat: 37.2285, lng: 127.2101 },
    { lat: 37.2305, lng: 127.2121 },
    { lat: 37.2315, lng: 127.2146 },
    { lat: 37.231, lng: 127.2166 },
    { lat: 37.2295, lng: 127.2176 },
    { lat: 37.2275, lng: 127.2171 },
    { lat: 37.2255, lng: 127.2161 },
    { lat: 37.224, lng: 127.2146 },
    { lat: 37.2235, lng: 127.2126 },
    { lat: 37.2245, lng: 127.2106 },
    { lat: 37.226, lng: 127.2091 },
  ],
  "경기도 용인시 처인구 유방동": [
    { lat: 37.2105, lng: 127.1816 },
    { lat: 37.212, lng: 127.1831 },
    { lat: 37.2135, lng: 127.1851 },
    { lat: 37.214, lng: 127.1871 },
    { lat: 37.213, lng: 127.1886 },
    { lat: 37.211, lng: 127.1891 },
    { lat: 37.209, lng: 127.1881 },
    { lat: 37.2075, lng: 127.1866 },
    { lat: 37.2065, lng: 127.1846 },
    { lat: 37.207, lng: 127.1826 },
    { lat: 37.2085, lng: 127.1816 },
    { lat: 37.21, lng: 127.1811 },
  ],
  // 4km 반경에 포함될 동네들
  "경기도 용인시 기흥구 구갈동": [
    { lat: 37.2525, lng: 127.2196 },
    { lat: 37.2545, lng: 127.2216 },
    { lat: 37.2565, lng: 127.2246 },
    { lat: 37.2555, lng: 127.2276 },
    { lat: 37.2535, lng: 127.2296 },
    { lat: 37.2505, lng: 127.2286 },
    { lat: 37.2485, lng: 127.2256 },
    { lat: 37.2495, lng: 127.2226 },
    { lat: 37.2515, lng: 127.2206 },
  ],
  "경기도 용인시 기흥구 상갈동": [
    { lat: 37.259, lng: 127.2091 },
    { lat: 37.2615, lng: 127.2116 },
    { lat: 37.264, lng: 127.2146 },
    { lat: 37.263, lng: 127.2176 },
    { lat: 37.261, lng: 127.2196 },
    { lat: 37.258, lng: 127.2186 },
    { lat: 37.256, lng: 127.2156 },
    { lat: 37.257, lng: 127.2126 },
    { lat: 37.259, lng: 127.2106 },
  ],
  // 6km 반경에 포함될 동네들
  "경기도 용인시 수지구 풍덕천동": [
    { lat: 37.271, lng: 127.1596 },
    { lat: 37.2735, lng: 127.1626 },
    { lat: 37.2755, lng: 127.1666 },
    { lat: 37.2745, lng: 127.1696 },
    { lat: 37.2715, lng: 127.1716 },
    { lat: 37.2685, lng: 127.1696 },
    { lat: 37.2665, lng: 127.1666 },
    { lat: 37.2675, lng: 127.1636 },
    { lat: 37.2695, lng: 127.1606 },
  ],
  "경기도 용인시 수지구 신봉동": [
    { lat: 37.282, lng: 127.1841 },
    { lat: 37.2845, lng: 127.1871 },
    { lat: 37.2865, lng: 127.1911 },
    { lat: 37.2855, lng: 127.1941 },
    { lat: 37.2825, lng: 127.1961 },
    { lat: 37.2795, lng: 127.1941 },
    { lat: 37.2775, lng: 127.1911 },
    { lat: 37.2785, lng: 127.1881 },
    { lat: 37.2805, lng: 127.1851 },
  ],
  // 8km 반경에 포함될 동네들
  "경기도 용인시 처인구 원삼면": [
    { lat: 37.165, lng: 127.1596 },
    { lat: 37.1675, lng: 127.1626 },
    { lat: 37.1695, lng: 127.1666 },
    { lat: 37.1685, lng: 127.1696 },
    { lat: 37.1655, lng: 127.1716 },
    { lat: 37.1625, lng: 127.1696 },
    { lat: 37.1605, lng: 127.1666 },
    { lat: 37.1615, lng: 127.1636 },
    { lat: 37.1635, lng: 127.1606 },
  ],
  "경기도 용인시 처인구 백암면": [
    { lat: 37.192, lng: 127.2406 },
    { lat: 37.1945, lng: 127.2436 },
    { lat: 37.1965, lng: 127.2476 },
    { lat: 37.1955, lng: 127.2506 },
    { lat: 37.1925, lng: 127.2526 },
    { lat: 37.1895, lng: 127.2506 },
    { lat: 37.1875, lng: 127.2476 },
    { lat: 37.1885, lng: 127.2446 },
    { lat: 37.1905, lng: 127.2416 },
  ],
  "경기도 용인시 기흥구 기흥동": [
    { lat: 37.272, lng: 127.2436 },
    { lat: 37.2745, lng: 127.2466 },
    { lat: 37.2765, lng: 127.2506 },
    { lat: 37.2755, lng: 127.2536 },
    { lat: 37.2725, lng: 127.2556 },
    { lat: 37.2695, lng: 127.2536 },
    { lat: 37.2675, lng: 127.2506 },
    { lat: 37.2685, lng: 127.2476 },
    { lat: 37.2705, lng: 127.2446 },
  ],
};

// 중심 좌표 (명지대학교 자연캠퍼스)
const CENTER_COORDINATES = { lat: 37.2229, lng: 127.1876 };

// 단계별 범위 설정
const RANGE_STEPS = [
  { step: 1, radius: 1000, description: "도보 가능 거리" }, // 1km
  { step: 2, radius: 2000, description: "자전거 이용 가능" }, // 2km
  { step: 3, radius: 4000, description: "대중교통 이용" }, // 4km
  { step: 4, radius: 6000, description: "대중교통 + 환승" }, // 6km
];

// 모든 가능한 지역 목록
const ALL_AVAILABLE_AREAS = Object.keys(FALLBACK_AREA_BOUNDARIES);

// Convex Hull 계산 함수
const getConvexHull = (
  points: { lat: number; lng: number }[],
): { lat: number; lng: number }[] => {
  if (points.length <= 3) return points;

  // 가장 아래쪽 점 찾기
  let bottom = 0;
  for (let i = 1; i < points.length; i++) {
    if (
      points[i].lat < points[bottom].lat ||
      (points[i].lat === points[bottom].lat &&
        points[i].lng < points[bottom].lng)
    ) {
      bottom = i;
    }
  }
  [points[0], points[bottom]] = [points[bottom], points[0]];

  // 극각 기준 정렬
  const pivot = points[0];
  const sorted = points.slice(1).sort((a, b) => {
    const angleA = Math.atan2(a.lat - pivot.lat, a.lng - pivot.lng);
    const angleB = Math.atan2(b.lat - pivot.lat, b.lng - pivot.lng);
    return angleA - angleB;
  });

  const hull = [pivot, sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    while (hull.length >= 2) {
      const o = hull[hull.length - 2];
      const p = hull[hull.length - 1];
      const q = sorted[i];
      const cross =
        (p.lng - o.lng) * (q.lat - o.lat) - (p.lat - o.lat) * (q.lng - o.lng);
      if (cross <= 0) {
        hull.pop();
      } else {
        break;
      }
    }
    hull.push(sorted[i]);
  }

  return hull;
};

// 반경 내 지역 찾기
const getAreasInRadius = (
  centerLat: number,
  centerLng: number,
  radiusKm: number,
): string[] => {
  return ALL_AVAILABLE_AREAS.filter((areaName) => {
    const areaCoords = FALLBACK_AREA_BOUNDARIES[areaName];
    if (!areaCoords) return false;

    // 중심점 계산
    const centerLat_area =
      areaCoords.reduce((sum, p) => sum + p.lat, 0) / areaCoords.length;
    const centerLng_area =
      areaCoords.reduce((sum, p) => sum + p.lng, 0) / areaCoords.length;

    const distance = calculateDistance(
      centerLat,
      centerLng,
      centerLat_area,
      centerLng_area,
    );

    // 디버깅용 로그 추가
    console.log(
      `${areaName}: 거리 ${distance.toFixed(2)}km, 반경 ${radiusKm}km, 포함: ${distance <= radiusKm ? "✅" : "❌"}`,
    );

    return distance <= radiusKm;
  });
};

const CommuteRangePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<"대중교통 + 도보" | "자차" | null>(
    null,
  );
  const isTransportSelected = selected !== null;

  // 지도에서 폴리곤 업데이트
  const updateMapPolygon = useCallback(() => {
    if (!mapRef.current?.map) return;

    // 기존 폴리곤 제거
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }

    const currentStep = RANGE_STEPS[selectedRange - 1];
    const radiusKm = currentStep.radius / 1000;

    // 반경 내 지역들 찾기
    const selectedAreas = getAreasInRadius(
      CENTER_COORDINATES.lat,
      CENTER_COORDINATES.lng,
      radiusKm,
    );

    console.log(
      `📍 ${radiusKm}km 반경에 ${selectedAreas.length}개 지역 선택:`,
      selectedAreas,
    );

    if (selectedAreas.length === 0) return;

    // 모든 선택된 지역의 좌표를 합치기
    const allPoints: { lat: number; lng: number }[] = [];
    selectedAreas.forEach((areaName) => {
      const coords = FALLBACK_AREA_BOUNDARIES[areaName];
      if (coords) {
        allPoints.push(...coords);
      }
    });

    // Convex Hull 계산
    const hullPoints = getConvexHull(allPoints);
    console.log(`🔶 Convex hull: ${hullPoints.length}개 점`);

    // 카카오맵 좌표로 변환
    const polygonPath = hullPoints.map(
      (point) => new kakao.maps.LatLng(point.lat, point.lng),
    );

    // 빨간색 폴리곤 생성
    const polygon = new kakao.maps.Polygon({
      path: polygonPath,
      strokeWeight: 3,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
    });

    // 지도에 추가
    polygon.setMap(mapRef.current.map);
    polygonRef.current = polygon;

    console.log("🎯 통합 폴리곤 렌더링 완료");
  }, [selectedRange]);

  // 지도 로드 시 초기 폴리곤 생성
  useEffect(() => {
    const timer = setTimeout(() => {
      updateMapPolygon();
    }, 1000); // 지도 로드를 위한 딜레이

    return () => clearTimeout(timer);
  }, [updateMapPolygon]);

  // 슬라이더 변경 시 폴리곤 업데이트
  useEffect(() => {
    updateMapPolygon();
  }, [selectedRange, updateMapPolygon]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSelectedRange(newValue);
    console.log(`🎚️ 슬라이더 변경: ${newValue}단계`);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 카카오맵 API가 로드되지 않았을 때의 처리
  if (typeof kakao === "undefined") {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium text-gray-900">
            지도를 로드하는 중...
          </div>
          <div className="text-sm text-gray-500">
            카카오맵 API를 불러오고 있습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-x-hidden bg-white">
      {/* 상단 네비게이션 헤더 */}
      <NavigationHeader title="" className="px-6 py-4 font-bold" backTo="/" />

      {/* 지도 영역 */}
      <div className="relative flex-1 overflow-hidden">
        <div
          id="kakao-map-simple"
          className="h-full w-full overflow-hidden"
          ref={(el) => {
            if (el && !mapRef.current && typeof kakao !== "undefined") {
              const map = new kakao.maps.Map(el, {
                center: new kakao.maps.LatLng(
                  CENTER_COORDINATES.lat,
                  CENTER_COORDINATES.lng,
                ),
                level: 6,
                draggable: true,
                scrollwheel: true,
                disableDoubleClick: false,
                disableDoubleClickZoom: false,
              });

              // 지도 드래그 시 수평 스크롤 방지
              kakao.maps.event.addListener(map, "dragstart", function () {
                document.body.style.overflow = "hidden";
              });

              kakao.maps.event.addListener(map, "dragend", function () {
                document.body.style.overflow = "auto";
              });

              mapRef.current = { map, isLoaded: true };
            }
          }}
        />
      </div>

      {/* 하단 컨트롤 */}
      <div className="overflow-x-hidden border-t bg-white p-6">
        <div className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            출퇴근 가능 범위를 설정해주세요.
          </h2>
          {/* <p className="text-sm text-gray-600">
            현재 범위: {RANGE_STEPS[selectedRange - 1].description} (
            {RANGE_STEPS[selectedRange - 1].radius / 1000}km)
          </p> */}
        </div>

        {/* 드래그 슬라이더 */}
        <div className="relative">
          {/* 슬라이더 컨테이너 */}
          <div className="relative h-6 w-full">
            {/* 배경 트랙 */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-200" />

            {/* 활성 트랙 */}
            <div
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${((selectedRange - 1) / 3) * 100}%` }}
            />

            {/* 단계별 점들 */}
            {RANGE_STEPS.map((step, index) => {
              const isActive = selectedRange >= step.step;
              const isCurrent = selectedRange === step.step;
              const position = (index / 3) * 100;

              return (
                <div
                  key={step.step}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                >
                  {/* 점 */}
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 transition-all duration-500 ease-out",
                      {
                        "border-blue-500 bg-blue-500": isActive,
                        "border-gray-300 bg-white": !isActive,
                        "h-5 w-5 shadow-lg": isCurrent, // 현재 선택된 점은 더 크게
                      },
                    )}
                  />

                  {/* 단계 번호 라벨 */}
                  {(step.step === 1 || step.step === 4) && (
                    <div
                      className={cn("absolute -bottom-6 w-20", {
                        "-left-0": step.step === 1, // 가까운 동네는 왼쪽으로 약간 이동
                        "-right-12": step.step === 4, // 먼 동네는 오른쪽으로 약간 이동
                      })}
                    >
                      <span
                        className={cn("whitespace-nowrap text-xs font-medium", {
                          "text-blue-600": isActive,
                          "text-gray-400": !isActive,
                        })}
                      >
                        {step.step === 1 ? "가까운 동네" : "먼 동네"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 슬라이더 핸들 (투명) */}
            <input
              ref={sliderRef}
              type="range"
              min="1"
              max="4"
              step="1"
              value={selectedRange}
              onChange={handleSliderChange}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent opacity-0"
            />
          </div>
        </div>

        {/* 드래그 상태 표시 */}
        <div
          className={cn(
            "mt-8 text-center text-sm transition-opacity duration-200",
            {
              "opacity-100": isDragging,
              "opacity-0": !isDragging,
            },
          )}
        >
          <p className="text-gray-600">
            드래그해서 출퇴근 가능 범위를 조절하세요
          </p>
        </div>
        <div className="mb-2 text-lg font-semibold text-gray-900">
          어떻게 이동하시나요?
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setSelected("대중교통 + 도보")}
            className={cn(
              "font-inter flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-center text-lg text-black shadow transition-all duration-150 active:scale-[0.95]",
              selected === "대중교통 + 도보"
                ? "border-blue-400 bg-[#86A7FF] text-[#374BFF]"
                : "bg-[#E0E0E0] text-[#494949]",
            )}
          >
            대중교통 + 도보
          </button>
          <button
            onClick={() => setSelected("자차")}
            className={cn(
              "font-inter flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-lg text-black shadow transition-all duration-150 active:scale-[0.95]",
              selected === "자차"
                ? "border-blue-400 bg-[#86A7FF] text-[#374BFF]"
                : "bg-[#E0E0E0] text-[#494949]",
            )}
          >
            자차
          </button>
        </div>
        {isTransportSelected && (
          <div className="animate-slide-up mt-12 duration-1000">
            <button
              className="font-inter w-full rounded-lg bg-[#247AF2] py-3 text-lg text-white shadow transition-all duration-150 active:scale-[0.95]"
              onClick={() => navigate("/worker-detail")}
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* 커스텀 슬라이더 스타일 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* 전체 스크롤 제한 */
          html, body {
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
          }
          
          /* iOS rubber band effect 방지 */
          body {
            position: fixed;
            width: 100%;
            height: 100%;
          }
          
          .custom-slider {
            -webkit-appearance: none;
            appearance: none;
          }

          .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #3b82f6;
            border: 4px solid white;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }

          .custom-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .custom-slider::-webkit-slider-thumb:active {
            transform: scale(1.25);
            box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
          }

          .custom-slider::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #3b82f6;
            border: 4px solid white;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }

          .custom-slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .custom-slider::-moz-range-thumb:active {
            transform: scale(1.25);
            box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
          }
        `,
        }}
      />
    </div>
  );
};

export default CommuteRangePage;
