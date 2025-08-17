import { useCallback, useEffect, useRef, useState } from "react";
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

// 더미 지역 데이터 (테스트용)
const FALLBACK_AREA_BOUNDARIES: {
  [key: string]: { lat: number; lng: number }[];
} = {
  "경기도 용인시 처인구 김량장동": [
    { lat: 37.2455, lng: 127.201 },
    { lat: 37.247, lng: 127.2025 },
    { lat: 37.2485, lng: 127.204 },
    { lat: 37.2495, lng: 127.206 },
    { lat: 37.2485, lng: 127.208 },
    { lat: 37.2465, lng: 127.209 },
    { lat: 37.244, lng: 127.2085 },
    { lat: 37.242, lng: 127.2075 },
    { lat: 37.2405, lng: 127.206 },
    { lat: 37.2395, lng: 127.204 },
    { lat: 37.2405, lng: 127.202 },
    { lat: 37.2425, lng: 127.2005 },
    { lat: 37.2445, lng: 127.2 },
  ],
  "경기도 용인시 처인구 역북동": [
    { lat: 37.2405, lng: 127.2085 },
    { lat: 37.242, lng: 127.21 },
    { lat: 37.244, lng: 127.2115 },
    { lat: 37.2455, lng: 127.213 },
    { lat: 37.2445, lng: 127.215 },
    { lat: 37.2425, lng: 127.2155 },
    { lat: 37.2405, lng: 127.215 },
    { lat: 37.2385, lng: 127.214 },
    { lat: 37.237, lng: 127.2125 },
    { lat: 37.236, lng: 127.211 },
    { lat: 37.2365, lng: 127.2095 },
    { lat: 37.2385, lng: 127.2085 },
  ],
  "경기도 용인시 처인구 마평동": [
    { lat: 37.254, lng: 127.212 },
    { lat: 37.256, lng: 127.2135 },
    { lat: 37.258, lng: 127.2155 },
    { lat: 37.259, lng: 127.218 },
    { lat: 37.2585, lng: 127.22 },
    { lat: 37.257, lng: 127.221 },
    { lat: 37.255, lng: 127.2205 },
    { lat: 37.253, lng: 127.2195 },
    { lat: 37.2515, lng: 127.218 },
    { lat: 37.251, lng: 127.216 },
    { lat: 37.252, lng: 127.214 },
    { lat: 37.2535, lng: 127.2125 },
  ],
  "경기도 용인시 처인구 유방동": [
    { lat: 37.238, lng: 127.195 },
    { lat: 37.2395, lng: 127.1965 },
    { lat: 37.241, lng: 127.1985 },
    { lat: 37.2415, lng: 127.2005 },
    { lat: 37.2405, lng: 127.202 },
    { lat: 37.2385, lng: 127.2025 },
    { lat: 37.2365, lng: 127.2015 },
    { lat: 37.235, lng: 127.2 },
    { lat: 37.234, lng: 127.198 },
    { lat: 37.2345, lng: 127.196 },
    { lat: 37.236, lng: 127.195 },
    { lat: 37.2375, lng: 127.1945 },
  ],
  "경기도 용인시 기흥구 구갈동": [
    { lat: 37.26, lng: 127.23 },
    { lat: 37.262, lng: 127.232 },
    { lat: 37.264, lng: 127.235 },
    { lat: 37.263, lng: 127.238 },
    { lat: 37.261, lng: 127.24 },
    { lat: 37.258, lng: 127.239 },
    { lat: 37.256, lng: 127.236 },
    { lat: 37.257, lng: 127.233 },
    { lat: 37.259, lng: 127.231 },
  ],
  "경기도 용인시 기흥구 상갈동": [
    { lat: 37.265, lng: 127.225 },
    { lat: 37.267, lng: 127.228 },
    { lat: 37.269, lng: 127.231 },
    { lat: 37.268, lng: 127.234 },
    { lat: 37.266, lng: 127.236 },
    { lat: 37.263, lng: 127.235 },
    { lat: 37.261, lng: 127.232 },
    { lat: 37.262, lng: 127.229 },
    { lat: 37.264, lng: 127.226 },
  ],
  // 6km 반경에 포함될 동네들
  "경기도 용인시 수지구 풍덕천동": [
    { lat: 37.285, lng: 127.18 },
    { lat: 37.288, lng: 127.183 },
    { lat: 37.29, lng: 127.187 },
    { lat: 37.289, lng: 127.19 },
    { lat: 37.286, lng: 127.192 },
    { lat: 37.283, lng: 127.19 },
    { lat: 37.281, lng: 127.187 },
    { lat: 37.282, lng: 127.184 },
    { lat: 37.284, lng: 127.181 },
  ],
  "경기도 용인시 수지구 신봉동": [
    { lat: 37.295, lng: 127.195 },
    { lat: 37.298, lng: 127.198 },
    { lat: 37.3, lng: 127.202 },
    { lat: 37.299, lng: 127.205 },
    { lat: 37.296, lng: 127.207 },
    { lat: 37.293, lng: 127.205 },
    { lat: 37.291, lng: 127.202 },
    { lat: 37.292, lng: 127.199 },
    { lat: 37.294, lng: 127.196 },
  ],
  "경기도 용인시 처인구 원삼면": [
    { lat: 37.19, lng: 127.18 },
    { lat: 37.193, lng: 127.183 },
    { lat: 37.196, lng: 127.187 },
    { lat: 37.195, lng: 127.19 },
    { lat: 37.192, lng: 127.192 },
    { lat: 37.189, lng: 127.19 },
    { lat: 37.187, lng: 127.187 },
    { lat: 37.188, lng: 127.184 },
    { lat: 37.19, lng: 127.181 },
  ],
  // 8km 반경에 포함될 동네들 (7.5km 거리로 재조정)
  "경기도 용인시 처인구 백암면": [
    { lat: 37.2, lng: 127.26 },
    { lat: 37.203, lng: 127.263 },
    { lat: 37.206, lng: 127.267 },
    { lat: 37.205, lng: 127.27 },
    { lat: 37.202, lng: 127.272 },
    { lat: 37.199, lng: 127.27 },
    { lat: 37.197, lng: 127.267 },
    { lat: 37.198, lng: 127.264 },
    { lat: 37.2, lng: 127.261 },
  ],
  "경기도 안산시 상록구 사동": [
    { lat: 37.3, lng: 127.16 },
    { lat: 37.303, lng: 127.163 },
    { lat: 37.306, lng: 127.167 },
    { lat: 37.305, lng: 127.17 },
    { lat: 37.302, lng: 127.172 },
    { lat: 37.299, lng: 127.17 },
    { lat: 37.297, lng: 127.167 },
    { lat: 37.298, lng: 127.164 },
    { lat: 37.3, lng: 127.161 },
  ],
  "경기도 용인시 기흥구 기흥동": [
    { lat: 37.28, lng: 127.27 },
    { lat: 37.283, lng: 127.273 },
    { lat: 37.286, lng: 127.277 },
    { lat: 37.285, lng: 127.28 },
    { lat: 37.282, lng: 127.282 },
    { lat: 37.279, lng: 127.28 },
    { lat: 37.277, lng: 127.277 },
    { lat: 37.278, lng: 127.274 },
    { lat: 37.28, lng: 127.271 },
  ],
};

// 중심 좌표
const CENTER_COORDINATES = { lat: 37.2422, lng: 127.2044 };

// 단계별 범위 설정
const RANGE_STEPS = [
  { step: 1, radius: 2000, description: "가까운 동네" }, // 2km
  { step: 2, radius: 4000, description: "주변 동네" }, // 4km
  { step: 3, radius: 6000, description: "확장된 지역" }, // 6km
  { step: 4, radius: 8000, description: "먼 동네" }, // 8km
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

const CommuteRangePageSimple: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

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
    <div className="flex h-screen flex-col bg-white">
      {/* 지도 영역 */}
      <div className="relative flex-1">
        <div
          id="kakao-map-simple"
          className="h-full w-full"
          ref={(el) => {
            if (el && !mapRef.current && typeof kakao !== "undefined") {
              const map = new kakao.maps.Map(el, {
                center: new kakao.maps.LatLng(
                  CENTER_COORDINATES.lat,
                  CENTER_COORDINATES.lng,
                ),
                level: 6,
              });
              mapRef.current = { map, isLoaded: true };
            }
          }}
        />
      </div>

      {/* 하단 컨트롤 */}
      <div className="border-t bg-white p-6">
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            출퇴근 가능 범위를 설정해주세요.
          </h2>
          <p className="text-sm text-gray-600">
            현재 범위: {RANGE_STEPS[selectedRange - 1].description} (
            {RANGE_STEPS[selectedRange - 1].radius / 1000}km)
          </p>
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
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <span
                      className={cn("text-xs font-medium", {
                        "text-blue-600": isActive,
                        "text-gray-400": !isActive,
                      })}
                    >
                      {step.step}
                    </span>
                  </div>
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
            "mt-4 text-center text-sm transition-opacity duration-200",
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

        {/* 선택된 범위 정보 */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {RANGE_STEPS[selectedRange - 1].description}
              </p>
              <p className="text-xs text-gray-500">
                반경 {RANGE_STEPS[selectedRange - 1].radius / 1000}km 내
                동네들이 표시됩니다
              </p>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                isDragging
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {selectedRange}단계
            </div>
          </div>
        </div>
      </div>

      {/* 커스텀 슬라이더 스타일 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
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

export default CommuteRangePageSimple;
