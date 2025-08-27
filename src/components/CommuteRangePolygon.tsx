import { useMap } from "@/components/Map";
import { AREA_BOUNDARIES, CENTER_COORDINATES } from "@/fixtures/commuteAreas";
import { getAreasInRadius, getConvexHull } from "@/utils/geolocation";
import React, { useEffect, useRef } from "react";

type CommuteRangePolygonProps = {
  radiusKm: number;
};

const CommuteRangePolygon: React.FC<CommuteRangePolygonProps> = ({
  radiusKm,
}) => {
  const map = useMap();
  const mapPolygonRef = useRef<kakao.maps.Polygon | null>(null);

  useEffect(() => {
    if (!map) return;

    if (mapPolygonRef.current) {
      mapPolygonRef.current.setMap(null);
    }

    const selectedAreas = getAreasInRadius(
      CENTER_COORDINATES.lat,
      CENTER_COORDINATES.lng,
      radiusKm,
    );
    if (selectedAreas.length === 0) return;

    const allPoints = selectedAreas.flatMap(
      (areaName) => AREA_BOUNDARIES[areaName],
    );
    const hullPoints = getConvexHull(allPoints);
    const polygonPath = hullPoints.map(
      (point) => new kakao.maps.LatLng(point.lat, point.lng),
    );

    const polygon = new kakao.maps.Polygon({
      path: polygonPath,
      strokeWeight: 3,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
    });

    polygon.setMap(map);
    mapPolygonRef.current = polygon;

    const bounds = new kakao.maps.LatLngBounds();
    polygonPath.forEach((point) => {
      bounds.extend(point);
    });

    // --- 부드러운 이동 및 줌을 위한 수정된 로직 ---

    // 1. 현재 지도 상태를 잠시 저장
    const lastCenter = map.getCenter();
    const lastLevel = map.getLevel();

    // 2. setBounds를 호출하여 API가 최적의 중심/레벨을 계산하도록 함
    map.setBounds(bounds);
    const targetLevel = map.getLevel(); // 계산된 목표 줌 레벨
    const targetCenter = map.getCenter(); // 계산된 목표 중심 좌표

    // 3. 사용자가 눈치채지 못하게 즉시 원래 상태로 되돌림
    map.setCenter(lastCenter);
    map.setLevel(lastLevel);

    // 4. 계산된 목표 값으로 부드럽게 이동 및 줌
    map.panTo(targetCenter);
    map.setLevel(targetLevel, { animate: true });
  }, [map, radiusKm]);

  return null;
};

export default CommuteRangePolygon;
