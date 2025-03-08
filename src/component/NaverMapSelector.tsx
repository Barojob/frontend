// NaverMapSelector.tsx
import React, { useEffect, useRef, useState } from "react";
import Button from "@/component/Button/Button";
import { RecentLocation } from "@/component/JobRequest/RecentLocationList";

type Props = {
  onSelect: (location: RecentLocation) => void;
};

const NaverMapSelector: React.FC<Props> = ({ onSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [locationName, setLocationName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markerInstance, setMarkerInstance] = useState<any>(null);

  // 역지오코딩: 좌표 → 주소(또는 위치명) 가져오기
  const getLocationName = (lat: number, lng: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.naver.maps.services.Geocoder();
      // 네이버에서는 coord2Address(lng, lat, callback)
      geocoder.coord2Address(lng, lat, (status: any, response: any) => {
        if (status === window.naver.maps.services.Status.OK) {
          const result = response.v2.address;
          resolve(result.roadAddress || result.jibunAddress || "");
        } else {
          reject("주소 변환 실패");
        }
      });
    });
  };

  // 정방향 지오코딩: 주소 → 좌표 검색
  const searchAddress = (
    query: string
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.naver.maps.services.Geocoder();
      geocoder.addressSearch(query, (status: any, response: any) => {
        if (status === window.naver.maps.services.Status.OK) {
          if (response.addresses && response.addresses.length > 0) {
            const result = response.addresses[0];
            resolve({ lat: parseFloat(result.y), lng: parseFloat(result.x) });
          } else {
            reject("검색 결과가 없습니다.");
          }
        } else {
          reject("검색 실패");
        }
      });
    });
  };

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
      return;
    }

    // 지도 생성
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      ),
      zoom: 13,
    });
    setMapInstance(map);

    // 마커 생성 (드래그 가능)
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      ),
      map: map,
      draggable: true,
    });
    setMarkerInstance(marker);

    // 마커 드래그 종료 이벤트 처리
    window.naver.maps.Event.addListener(marker, "dragend", function () {
      const pos = marker.getPosition();
      const newLat = pos.y;
      const newLng = pos.x;
      setMarkerPosition({ lat: newLat, lng: newLng });
      getLocationName(newLat, newLng)
        .then((name) => setLocationName(name))
        .catch((err) => console.error(err));
    });

    // 지도 클릭 시 마커 이동 이벤트 처리
    window.naver.maps.Event.addListener(map, "click", function (e: any) {
      const clickedPosition = e.coord; // {x, y} 형태
      marker.setPosition(clickedPosition);
      const newLat = clickedPosition.y;
      const newLng = clickedPosition.x;
      setMarkerPosition({ lat: newLat, lng: newLng });
      getLocationName(newLat, newLng)
        .then((name) => setLocationName(name))
        .catch((err) => console.error(err));
    });

    // 초기 로드 시에도 역지오코딩 호출
    getLocationName(markerPosition.lat, markerPosition.lng)
      .then((name) => setLocationName(name))
      .catch((err) => console.error(err));
  }, []);

  // 주소 검색 버튼 클릭 시
  const handleSearch = async () => {
    try {
      const result = await searchAddress(searchQuery);
      setMarkerPosition(result);
      if (mapInstance && markerInstance) {
        const newLatLng = new window.naver.maps.LatLng(result.lat, result.lng);
        markerInstance.setPosition(newLatLng);
        mapInstance.setCenter(newLatLng);
      }
      getLocationName(result.lat, result.lng)
        .then((name) => setLocationName(name))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  // 출발지로 설정 버튼 클릭 시 선택된 위치 정보 전달
  const handleSelect = () => {
    const newLocation: RecentLocation = {
      address: `${markerPosition.lat}, ${markerPosition.lng}`, // 실제 주소 포맷으로 가공 가능
      name: locationName,
    };
    onSelect(newLocation);
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
      <div className="mt-4">
        <p>선택된 위치: {locationName || "선택 중..."}</p>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="주소 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 flex-1"
          />
          <Button onClick={handleSearch}>검색하기</Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSelect}>출발지로 설정</Button>
        </div>
      </div>
    </div>
  );
};

export default NaverMapSelector;
