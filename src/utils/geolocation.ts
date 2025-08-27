import { AREA_BOUNDARIES } from "@/fixtures/commuteAreas";

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const EARTH_RADIUS_KM = 6371;
  const deltaLatitude = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLongitude = ((lng2 - lng1) * Math.PI) / 180;

  const haversineCentralAngle =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(haversineCentralAngle),
      Math.sqrt(1 - haversineCentralAngle),
    );

  return EARTH_RADIUS_KM * angularDistance;
};

export const getAreasInRadius = (
  centerLat: number,
  centerLng: number,
  radiusKm: number,
): string[] => {
  return Object.keys(AREA_BOUNDARIES).filter((areaName) => {
    const areaCoords = AREA_BOUNDARIES[areaName];
    if (!areaCoords?.length) return false;

    const centerLatArea =
      areaCoords.reduce((sum, p) => sum + p.lat, 0) / areaCoords.length;
    const centerLngArea =
      areaCoords.reduce((sum, p) => sum + p.lng, 0) / areaCoords.length;

    const distance = calculateDistance(
      centerLat,
      centerLng,
      centerLatArea,
      centerLngArea,
    );
    return distance <= radiusKm;
  });
};

export const getConvexHull = (
  points: { lat: number; lng: number }[],
): { lat: number; lng: number }[] => {
  if (points.length <= 3) return points;

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
