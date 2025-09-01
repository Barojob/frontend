import { AREA_BOUNDARIES, CENTER_COORDINATES } from "@/fixtures/commuteAreas";
import { Nullable } from "@/types/misc";
import { getAreasInRadius, getConvexHull } from "@/utils/geolocation";
import React, { useEffect, useRef } from "react";

type CommuteRangePolygonProps = {
  radiusKm: number;
  map: Nullable<kakao.maps.Map>;
};

const CommuteRangePolygon: React.FC<CommuteRangePolygonProps> = ({
  radiusKm,
  map,
}) => {
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

    const lastCenter = map.getCenter();
    const lastLevel = map.getLevel();

    map.setBounds(bounds);
    const targetLevel = map.getLevel();
    const targetCenter = map.getCenter();

    map.setCenter(lastCenter);
    map.setLevel(lastLevel);

    map.panTo(targetCenter);
    map.setLevel(targetLevel, { animate: true });
  }, [map, radiusKm]);

  return null;
};

export default CommuteRangePolygon;
