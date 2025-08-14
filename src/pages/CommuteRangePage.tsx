import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../components/Map";
import { MapHandle } from "../types/map";
import { Nullable } from "../types/misc";
import { cn } from "../utils/classname";
import { configs } from "../utils/configs";

// 드래그 단계별 설정
const RANGE_STEPS = [
  {
    level: 1,
    label: "가까운 동네",
    description: "현재 동네만",
    radius: 1000, // 1km
  },
  {
    level: 2,
    label: "조금 가까운 동네",
    description: "인근 2-3개 동네",
    radius: 2000, // 2km
  },
  {
    level: 3,
    label: "조금 먼 동네",
    description: "인근 5-6개 동네",
    radius: 4000, // 4km
  },
  {
    level: 4,
    label: "먼 동네",
    description: "인근 10개 이상 동네",
    radius: 8000, // 8km
  },
];

// 실제 행정구역 주소를 카카오 API로 검색할 목록 (확장된 테스트 버전)
const AREA_SEARCH_LIST = {
  1: ["경기도 용인시 처인구 김량장동"], // 가까운 동네 (명지로 116이 위치한 동네)
  2: ["경기도 용인시 처인구 김량장동", "경기도 용인시 처인구 역북동"], // 조금 가까운 동네
  3: [
    "경기도 용인시 처인구 김량장동",
    "경기도 용인시 처인구 역북동",
    "경기도 용인시 처인구 마평동",
  ], // 조금 먼 동네
  4: [
    "경기도 용인시 처인구 김량장동",
    "경기도 용인시 처인구 역북동",
    "경기도 용인시 처인구 마평동",
    "경기도 용인시 처인구 유방동",
    // 성능 테스트를 위한 추가 지역들 (실제로는 API에서 받아올 많은 지역들을 시뮬레이션)
    "경기도 용인시 처인구 남사면",
    "경기도 용인시 처인구 원삼면",
    "경기도 용인시 처인구 백암면",
    "경기도 용인시 기흥구 구갈동",
    "경기도 용인시 기흥구 상갈동",
    "경기도 용인시 기흥구 기흥동",
    "경기도 용인시 수지구 풍덕천동",
    "경기도 용인시 수지구 신봉동",
    // "경기도 안산시 상록구 사동", // 더 많은 지역이 필요할 때 주석 해제
    // "경기도 안산시 상록구 본오동",
    // "경기도 안산시 단원구 고잔동",
  ], // 먼 동네 (12개 지역으로 성능 테스트)
};

// Fallback 좌표 - 실제 행정구역 경계와 유사한 다각형 좌표들
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
};

// 성능 최적화 설정
const PERFORMANCE_SETTINGS = {
  MAX_TOTAL_POINTS: 1000, // 전체 최대 점 개수
  MAX_POINTS_PER_AREA: 50, // 지역당 최대 점 개수
  MAX_AREAS_TO_PROCESS: 15, // 동시 처리할 최대 지역 수
  BATCH_SIZE: 5, // 배치 처리 크기
  SIMPLIFICATION_THRESHOLD: 0.001, // 점 단순화 임계값
};

// 성능 모니터링
const performanceMonitor = {
  startTime: 0,
  pointCount: 0,
  areaCount: 0,

  start() {
    this.startTime = performance.now();
    this.pointCount = 0;
    this.areaCount = 0;
  },

  addPoints(count: number) {
    this.pointCount += count;
  },

  addArea() {
    this.areaCount += 1;
  },

  getStats() {
    const duration = performance.now() - this.startTime;
    return {
      duration: Math.round(duration),
      pointCount: this.pointCount,
      areaCount: this.areaCount,
      pointsPerMs: Math.round((this.pointCount / duration) * 1000) / 1000,
    };
  },
};

// 좌표 캐시 (최적화된 버전)
const AREA_COORDINATES_CACHE: {
  [key: string]: {
    name: string;
    coords: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    simplified?: { lat: number; lng: number }[]; // 단순화된 좌표
    lastAccess: number;
  };
} = {};

// Douglas-Peucker 알고리즘으로 점 단순화
const simplifyPoints = (
  points: { lat: number; lng: number }[],
  tolerance: number = PERFORMANCE_SETTINGS.SIMPLIFICATION_THRESHOLD,
): { lat: number; lng: number }[] => {
  if (points.length <= 2) return points;

  // 거리 계산 함수
  const getDistance = (
    point: { lat: number; lng: number },
    lineStart: { lat: number; lng: number },
    lineEnd: { lat: number; lng: number },
  ): number => {
    const A = point.lng - lineStart.lng;
    const B = point.lat - lineStart.lat;
    const C = lineEnd.lng - lineStart.lng;
    const D = lineEnd.lat - lineStart.lat;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;

    if (lenSq === 0) return Math.sqrt(A * A + B * B);

    const param = dot / lenSq;
    let xx: number, yy: number;

    if (param < 0) {
      xx = lineStart.lng;
      yy = lineStart.lat;
    } else if (param > 1) {
      xx = lineEnd.lng;
      yy = lineEnd.lat;
    } else {
      xx = lineStart.lng + param * C;
      yy = lineStart.lat + param * D;
    }

    const dx = point.lng - xx;
    const dy = point.lat - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const simplifyRecursive = (
    points: { lat: number; lng: number }[],
    first: number,
    last: number,
    tolerance: number,
  ): { lat: number; lng: number }[] => {
    let maxDistance = 0;
    let index = 0;

    for (let i = first + 1; i < last; i++) {
      const distance = getDistance(points[i], points[first], points[last]);
      if (distance > maxDistance) {
        maxDistance = distance;
        index = i;
      }
    }

    if (maxDistance > tolerance) {
      const leftResults = simplifyRecursive(points, first, index, tolerance);
      const rightResults = simplifyRecursive(points, index, last, tolerance);

      return [...leftResults.slice(0, -1), ...rightResults];
    } else {
      return [points[first], points[last]];
    }
  };

  const simplified = simplifyRecursive(points, 0, points.length - 1, tolerance);
  console.log(`점 단순화: ${points.length}개 → ${simplified.length}개`);
  return simplified;
};

// 점 샘플링 (균등 분포)
const samplePoints = (
  points: { lat: number; lng: number }[],
  maxPoints: number,
): { lat: number; lng: number }[] => {
  if (points.length <= maxPoints) return points;

  const step = points.length / maxPoints;
  const sampled: { lat: number; lng: number }[] = [];

  for (let i = 0; i < maxPoints; i++) {
    const index = Math.floor(i * step);
    sampled.push(points[index]);
  }

  // 마지막 점 보장
  if (sampled[sampled.length - 1] !== points[points.length - 1]) {
    sampled[sampled.length - 1] = points[points.length - 1];
  }

  console.log(`점 샘플링: ${points.length}개 → ${sampled.length}개`);
  return sampled;
};

// Concave Hull 알고리즘 (Alpha Shapes의 단순화된 버전)
const getConcaveHull = (
  points: { lat: number; lng: number }[],
  alpha: number = 0.05, // alpha 값이 작을수록 더 오목한 모양
): { lat: number; lng: number }[] => {
  if (points.length < 3) return points;

  // 중복 제거
  const uniquePoints = points.filter(
    (point, index, arr) =>
      arr.findIndex((p) => p.lat === point.lat && p.lng === point.lng) ===
      index,
  );

  if (uniquePoints.length < 3) return uniquePoints;

  // 중심점 계산
  const centerLat =
    uniquePoints.reduce((sum, p) => sum + p.lat, 0) / uniquePoints.length;
  const centerLng =
    uniquePoints.reduce((sum, p) => sum + p.lng, 0) / uniquePoints.length;

  // 중심점에서 각 점까지의 각도로 정렬
  const sortedPoints = uniquePoints
    .map((point) => ({
      ...point,
      angle: Math.atan2(point.lat - centerLat, point.lng - centerLng),
      distance: Math.sqrt(
        Math.pow(point.lat - centerLat, 2) + Math.pow(point.lng - centerLng, 2),
      ),
    }))
    .sort((a, b) => a.angle - b.angle);

  // 거리 기반 필터링으로 concave 효과 생성
  const filteredPoints: {
    lat: number;
    lng: number;
    angle: number;
    distance: number;
  }[] = [];
  const avgDistance =
    sortedPoints.reduce((sum, p) => sum + p.distance, 0) / sortedPoints.length;

  for (let i = 0; i < sortedPoints.length; i++) {
    const current = sortedPoints[i];
    const prev =
      sortedPoints[(i - 1 + sortedPoints.length) % sortedPoints.length];
    const next = sortedPoints[(i + 1) % sortedPoints.length];

    // 현재 점이 평균 거리보다 많이 멀거나, 인접한 점들과의 각도 차이가 큰 경우
    const angleDiffPrev = Math.abs(current.angle - prev.angle);
    const angleDiffNext = Math.abs(next.angle - current.angle);
    const avgAngleDiff = (angleDiffPrev + angleDiffNext) / 2;

    // 조건에 따라 점 선택 (concave 모양 만들기)
    if (
      current.distance <= avgDistance * (1 + alpha) || // 너무 멀지 않거나
      avgAngleDiff > alpha * 2 || // 각도 변화가 크거나
      filteredPoints.length < 6 // 최소 6개 점은 보장
    ) {
      filteredPoints.push(current);
    }
  }

  // 각도가 급격히 변하는 곳에서 추가 점들을 제거하여 더 자연스러운 모양 생성
  const finalPoints: { lat: number; lng: number }[] = [];
  for (let i = 0; i < filteredPoints.length; i++) {
    const current = filteredPoints[i];
    const prev =
      filteredPoints[(i - 1 + filteredPoints.length) % filteredPoints.length];
    const next = filteredPoints[(i + 1) % filteredPoints.length];

    // 세 점이 거의 일직선상에 있으면 중간 점 제거 (더 자연스러운 모양)
    const cross =
      (current.lat - prev.lat) * (next.lng - current.lng) -
      (current.lng - prev.lng) * (next.lat - current.lat);

    if (Math.abs(cross) > alpha * 0.0001 || finalPoints.length < 4) {
      finalPoints.push({ lat: current.lat, lng: current.lng });
    }
  }

  console.log(
    `Concave Hull: ${points.length}개 점 → ${finalPoints.length}개 점으로 축소 (최적화됨)`,
  );

  // 성능 경고
  if (points.length > PERFORMANCE_SETTINGS.MAX_TOTAL_POINTS) {
    console.warn(`성능 경고: ${points.length}개 점 처리됨. 최적화 권장.`);
  }

  return finalPoints.length >= 3 ? finalPoints : getSimpleConvexHull(points);
};

// 간단한 Convex Hull (fallback 용도)
const getSimpleConvexHull = (
  points: { lat: number; lng: number }[],
): { lat: number; lng: number }[] => {
  if (points.length < 3) return points;

  // 중심점 기준 각도 정렬
  const centerLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
  const centerLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;

  return points
    .map((point) => ({
      ...point,
      angle: Math.atan2(point.lat - centerLat, point.lng - centerLng),
    }))
    .sort((a, b) => a.angle - b.angle)
    .map(({ lat, lng }) => ({ lat, lng }));
};

const CommuteRangePage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const mapRef = useRef<Nullable<MapHandle>>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // 지도 폴리곤과 오버레이를 저장할 ref
  const polygonsRef = useRef<kakao.maps.Polygon[]>([]);
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);

  // 현재 선택된 주소 (실제로는 이전 페이지에서 받아올 데이터)
  const currentAddress = "경기도 용인시 처인구 명지로 116 8";
  const selectedAreaNames =
    AREA_SEARCH_LIST[selectedRange as keyof typeof AREA_SEARCH_LIST] || [];
  const areaCount = selectedAreaNames.length;

  // 실제 행정구역과 유사한 불규칙한 경계 생성 (더 상세한 버전)
  const generateDetailedAreaBounds = useCallback(
    (
      center: { lat: number; lng: number },
      areaName: string,
    ): { lat: number; lng: number }[] => {
      // 동네 이름 기반 해시로 일관된 랜덤성
      const hash = areaName
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

      const baseRadius =
        areaName.includes("구") && !areaName.includes("동") ? 0.015 : 0.008;

      // 더 상세한 행정구역 경계 생성 (20~30개 점으로 매우 불규칙한 모양)
      const points: { lat: number; lng: number }[] = [];
      const numPoints = 20 + (hash % 11); // 20~30개 점

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;

        // 더 큰 변동폭으로 불규칙성 증가
        const variation1 = ((hash * (i + 1) * 7) % 100) / 100; // 0~1
        const variation2 = ((hash * (i + 1) * 13) % 100) / 100; // 0~1
        const variation3 = ((hash * (i + 1) * 19) % 100) / 100; // 0~1

        // 반지름 변화 (30%~170% 범위로 더 극단적)
        const radiusMultiplier = 0.3 + variation1 * 1.4;
        const radius = baseRadius * radiusMultiplier;

        // 각도 변형 증가 (더 울퉁불퉁한 모양)
        const angleVariation = (variation2 - 0.5) * 0.8; // -0.4~0.4
        const adjustedAngle = angle + angleVariation;

        // 추가 노이즈로 더 자연스러운 모양
        const noiseRadius = baseRadius * 0.2 * (variation3 - 0.5); // ±10% 노이즈

        const lat =
          center.lat +
          (radius + noiseRadius) * Math.cos(adjustedAngle) +
          (variation1 - 0.5) * 0.001; // 미세 조정
        const lng =
          center.lng +
          (radius + noiseRadius) * Math.sin(adjustedAngle) +
          (variation2 - 0.5) * 0.001; // 미세 조정

        points.push({ lat, lng });
      }

      // 몇 개 점을 추가로 변형해서 concave 영역 만들기
      const concavePoints = Math.floor(numPoints * 0.2); // 20% 정도의 점들을 안쪽으로 당김
      for (let i = 0; i < concavePoints; i++) {
        const randomIndex = (hash * (i + 7)) % numPoints;
        const point = points[randomIndex];

        // 중심점 방향으로 20-40% 당김 (concave 효과)
        const pullFactor = 0.2 + ((hash * (i + 17)) % 20) / 100; // 0.2~0.4
        point.lat = center.lat + (point.lat - center.lat) * (1 - pullFactor);
        point.lng = center.lng + (point.lng - center.lng) * (1 - pullFactor);
      }

      console.log(
        `${areaName}: ${numPoints}개 점으로 상세 경계 생성 (concave 포함)`,
      );
      return points;
    },
    [],
  );

  // 실제 행정구역과 유사한 경계 좌표를 가져오는 함수 (백엔드 연동 버전)
  const getActualAreaBoundary = useCallback(
    async (address: string): Promise<{ lat: number; lng: number }[]> => {
      // 1차: 백엔드 API에서 실제 행정구역 경계 데이터 조회
      try {
        console.log("백엔드 API로 경계 데이터 요청:", address);

        const response = await fetch(
          `/api/administrative-boundary?address=${encodeURIComponent(address)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const boundaryData = await response.json();

          if (boundaryData.coordinates && boundaryData.coordinates.length > 0) {
            console.log(
              `백엔드에서 경계 데이터 수신: ${boundaryData.coordinates.length}개 점`,
            );

            // 백엔드에서 받은 좌표가 너무 많으면 클라이언트에서 최적화
            let optimizedCoords = boundaryData.coordinates;
            if (
              optimizedCoords.length > PERFORMANCE_SETTINGS.MAX_POINTS_PER_AREA
            ) {
              optimizedCoords = samplePoints(
                optimizedCoords,
                PERFORMANCE_SETTINGS.MAX_POINTS_PER_AREA,
              );
              console.log(
                `클라이언트 최적화: ${boundaryData.coordinates.length} → ${optimizedCoords.length}개 점`,
              );
            }

            return optimizedCoords;
          }
        } else {
          console.warn(
            `백엔드 API 실패 (${response.status}):`,
            await response.text(),
          );
        }
      } catch (error) {
        console.error("백엔드 API 호출 실패:", error);
      }

      // 2차: 미리 정의된 실제 행정구역 경계 사용 (fallback)
      const predefinedBoundary = FALLBACK_AREA_BOUNDARIES[address];
      if (predefinedBoundary) {
        console.log(
          "미리 정의된 경계 사용:",
          address,
          predefinedBoundary.length + "개 점",
        );
        return predefinedBoundary;
      }

      // 3차: 카카오 Local API로 중심점을 얻고 추정 경계 생성
      try {
        console.log("카카오 API로 추정 경계 생성:", address);

        const response = await fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
          {
            headers: {
              Authorization: `KakaoAK ${configs.KAKAO_MAP_API_KEY}`,
            },
          },
        );

        const data = await response.json();

        if (data.documents && data.documents.length > 0) {
          const document = data.documents[0];
          const center = {
            lat: parseFloat(document.y),
            lng: parseFloat(document.x),
          };

          console.log("카카오 API로 중심점 획득:", center);

          // 중심점을 기반으로 추정 경계 생성
          const estimatedBoundary = generateDetailedAreaBounds(center, address);

          // 백엔드에 추정 경계 데이터 전송 (향후 개선을 위해)
          try {
            await fetch("/api/administrative-boundary/estimated", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address,
                center,
                estimatedBoundary,
                source: "kakao-estimation",
              }),
            });
          } catch (err) {
            console.warn("추정 데이터 전송 실패:", err);
          }

          return estimatedBoundary;
        }
      } catch (error) {
        console.log("카카오 Local API 실패:", error);
      }

      // 4차: 기본값으로 추정 경계 생성
      const defaultCenter = { lat: 37.2422, lng: 127.2044 };
      console.log("기본 중심점 사용:", defaultCenter);

      return generateDetailedAreaBounds(defaultCenter, address);
    },
    [generateDetailedAreaBounds],
  );

  // 지도에서 동네 영역 표시하기 (성능 최적화 버전)
  const updateMapAreas = useCallback(async () => {
    console.log("updateMapAreas 호출됨, selectedRange:", selectedRange);
    performanceMonitor.start();

    const mapHandle = mapRef.current;
    if (!mapHandle?.map || !mapHandle.isLoaded) {
      console.log("맵이 로드되지 않음");
      return;
    }

    setIsLoadingAreas(true);

    // 기존 폴리곤과 오버레이 제거
    polygonsRef.current.forEach((polygon) => polygon.setMap(null));
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    polygonsRef.current = [];
    overlaysRef.current = [];

    const selectedAreaNames =
      AREA_SEARCH_LIST[selectedRange as keyof typeof AREA_SEARCH_LIST];

    console.log("선택된 지역 이름들:", selectedAreaNames);

    // 처리할 지역 수 제한
    const areasToProcess = selectedAreaNames.slice(
      0,
      PERFORMANCE_SETTINGS.MAX_AREAS_TO_PROCESS,
    );
    if (areasToProcess.length < selectedAreaNames.length) {
      console.warn(
        `지역이 너무 많음. ${areasToProcess.length}/${selectedAreaNames.length}개만 처리`,
      );
    }

    try {
      const allAreaData = [];

      // 배치 처리로 메모리 사용량 제한
      for (
        let i = 0;
        i < areasToProcess.length;
        i += PERFORMANCE_SETTINGS.BATCH_SIZE
      ) {
        const batch = areasToProcess.slice(
          i,
          i + PERFORMANCE_SETTINGS.BATCH_SIZE,
        );

        const batchPromises = batch.map(async (areaName) => {
          console.log("처리 중인 지역:", areaName);
          performanceMonitor.addArea();

          let areaData = AREA_COORDINATES_CACHE[areaName];

          // 캐시에 없으면 실제 행정구역 경계 가져오기
          if (!areaData) {
            try {
              const coords = await getActualAreaBoundary(areaName);

              // 지역당 점 개수 제한
              let processedCoords = coords;
              if (coords.length > PERFORMANCE_SETTINGS.MAX_POINTS_PER_AREA) {
                processedCoords = samplePoints(
                  coords,
                  PERFORMANCE_SETTINGS.MAX_POINTS_PER_AREA,
                );
              }

              // 점 단순화 적용
              const simplifiedCoords = simplifyPoints(processedCoords);

              performanceMonitor.addPoints(simplifiedCoords.length);

              areaData = {
                name: areaName.split(" ").pop() || areaName,
                coords: processedCoords,
                simplified: simplifiedCoords,
                center: processedCoords.reduce(
                  (acc, coord, _, arr) => ({
                    lat: acc.lat + coord.lat / arr.length,
                    lng: acc.lng + coord.lng / arr.length,
                  }),
                  { lat: 0, lng: 0 },
                ),
                lastAccess: Date.now(),
              };

              // 캐시에 저장
              AREA_COORDINATES_CACHE[areaName] = areaData;
              console.log("새로운 지역 데이터 생성:", {
                name: areaData.name,
                originalPoints: coords.length,
                processedPoints: processedCoords.length,
                simplifiedPoints: simplifiedCoords.length,
              });
            } catch (error) {
              console.error("지역 좌표 가져오기 실패:", areaName, error);
              return null;
            }
          } else {
            // 캐시 히트
            areaData.lastAccess = Date.now();
            const pointsToUse = areaData.simplified || areaData.coords;
            performanceMonitor.addPoints(pointsToUse.length);
            console.log("캐시된 지역 데이터 사용:", {
              name: areaData.name,
              points: pointsToUse.length,
            });
          }

          return areaData;
        });

        const batchResults = await Promise.all(batchPromises);
        allAreaData.push(...batchResults.filter((data) => data !== null));
      }

      // 메모리 정리 (오래된 캐시 제거)
      const now = Date.now();
      const CACHE_TTL = 10 * 60 * 1000; // 10분
      Object.keys(AREA_COORDINATES_CACHE).forEach((key) => {
        if (now - AREA_COORDINATES_CACHE[key].lastAccess > CACHE_TTL) {
          delete AREA_COORDINATES_CACHE[key];
          console.log("캐시 정리:", key);
        }
      });

      // 모든 지역을 포함하는 경계 좌표 계산
      if (allAreaData.length > 0) {
        const allBoundaryPoints: { lat: number; lng: number }[] = [];

        allAreaData.forEach((areaData) => {
          const pointsToUse = areaData.simplified || areaData.coords;
          pointsToUse.forEach((coord: { lat: number; lng: number }) => {
            allBoundaryPoints.push({ lat: coord.lat, lng: coord.lng });
          });
        });

        console.log("모든 경계점들:", allBoundaryPoints.length);

        // 최적화된 Concave Hull 알고리즘 사용
        const concaveHullPoints = getConcaveHull(allBoundaryPoints, 0.08);

        console.log("Concave Hull 점들:", concaveHullPoints.length);

        const stats = performanceMonitor.getStats();
        console.log("성능 통계:", stats);

        // 다각형 경로 생성
        const polygonPath = concaveHullPoints.map(
          (point: { lat: number; lng: number }) =>
            new kakao.maps.LatLng(point.lat, point.lng),
        );

        // 통합 폴리곤 생성
        const combinedPolygon = new kakao.maps.Polygon({
          path: polygonPath,
          strokeWeight: 2,
          strokeColor: "#FF6B6B",
          strokeOpacity: 0.8,
          fillColor: "#FF6B6B",
          fillOpacity: 0.2,
        });

        combinedPolygon.setMap(mapHandle.map);
        polygonsRef.current.push(combinedPolygon);

        // 중앙점 계산
        const centerLat =
          concaveHullPoints.reduce(
            (sum: number, p: { lat: number; lng: number }) => sum + p.lat,
            0,
          ) / concaveHullPoints.length;
        const centerLng =
          concaveHullPoints.reduce(
            (sum: number, p: { lat: number; lng: number }) => sum + p.lng,
            0,
          ) / concaveHullPoints.length;

        const customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(centerLat, centerLng),
          content: `<div class="px-3 py-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm font-medium text-gray-700">
            ${allAreaData.length}개 동네 포함 (${stats.pointCount}개 점, ${stats.duration}ms)
          </div>`,
          yAnchor: 0.5,
        });

        customOverlay.setMap(mapHandle.map);
        overlaysRef.current.push(customOverlay);
      }
    } catch (error) {
      console.error("지역 표시 중 오류 발생:", error);
    } finally {
      setIsLoadingAreas(false);
    }
  }, [selectedRange, getActualAreaBoundary]);

  // 지도가 로드되거나 선택 범위가 변경될 때 영역 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      updateMapAreas();
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedRange, updateMapAreas]);

  // 지도 로드 상태 모니터링 및 중심 좌표 설정
  useEffect(() => {
    const interval = setInterval(() => {
      const mapHandle = mapRef.current;
      if (mapHandle?.map && mapHandle.isLoaded) {
        console.log("지도 로드 완료, 중심 좌표를 명지로 116으로 설정");

        // 명지로 116 위치로 지도 중심 이동
        const center = new kakao.maps.LatLng(37.2422, 127.2044);
        mapHandle.map.setCenter(center);
        mapHandle.map.setLevel(5); // 적절한 줌 레벨로 설정

        clearInterval(interval);
        updateMapAreas();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [updateMapAreas]);

  // 슬라이더 드래그 핸들러
  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      console.log("슬라이더 값 변경:", newValue);
      setSelectedRange(newValue);
    },
    [],
  );

  // 슬라이더 마우스 다운
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // 슬라이더 마우스 업
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 확인 버튼 클릭 시 백엔드로 데이터 전송
  const handleConfirm = () => {
    const selectedAreaNames =
      AREA_SEARCH_LIST[selectedRange as keyof typeof AREA_SEARCH_LIST];

    console.log("선택된 출퇴근 범위:", RANGE_STEPS[selectedRange - 1]);
    console.log("선택된 지역들:", selectedAreaNames);
    // TODO: 백엔드 API 호출
  };

  const currentStep = RANGE_STEPS[selectedRange - 1];

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <Link to="/signup" className="p-1">
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">
          출퇴근 가능 범위
        </h1>
        <div className="w-8" /> {/* 공간 확보용 */}
      </div>

      {/* 현재 주소 표시 */}
      <div className="bg-blue-50 px-4 py-3">
        <p className="text-sm text-gray-600">선택한 주소</p>
        <p className="text-base font-medium text-gray-900">{currentAddress}</p>
      </div>

      {/* 지도 영역 */}
      <div className="relative flex-1">
        <Map className="h-full w-full" ref={mapRef} />

        {/* 중심점 마커 */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg"></div>
        </div>

        {/* 로딩 표시 */}
        {isLoadingAreas && (
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 transform">
            <div className="flex items-center space-x-2 rounded-md bg-white px-3 py-2 shadow-md">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm text-gray-600">지역 정보 로딩중...</span>
            </div>
          </div>
        )}
      </div>

      {/* 범위 정보 표시 */}
      <div className="bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-gray-900">
              {currentStep.label}
            </p>
            <p className="text-sm text-gray-600">{currentStep.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">포함될 동네</p>
            <p className="text-base font-medium text-blue-600">{areaCount}개</p>
          </div>
        </div>
      </div>

      {/* 드래그 슬라이더 */}
      <div className="border-t border-gray-100 bg-white px-6 py-6">
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
              const isActive = selectedRange >= step.level;
              const isCurrent = selectedRange === step.level;
              const position = (index / 3) * 100;

              return (
                <div
                  key={step.level}
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
                      {step.level}
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
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
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
      </div>

      {/* 확인 버튼 */}
      <div className="border-t border-gray-100 bg-white p-4">
        <button
          onClick={handleConfirm}
          className="w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          이 범위로 설정하기
        </button>
      </div>
    </div>
  );
};

export default CommuteRangePage;
