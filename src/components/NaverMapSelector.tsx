// NaverMapSelector.tsx
import React, { useEffect, useRef, useState } from "react";
import { RecentLocation } from "@/component/JobRequest/RecentLocationList";
import { cn } from "@/utils/classname";
import Button from "./Button/Button";
import { IoIosArrowForward } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";

type Props = {
  className?: string;
  onSelect: (location: RecentLocation) => void;
};

const NaverMapSelector: React.FC<Props> = ({ className, onSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 37.5617,
    lng: 127.065,
  });
  const [locationName, setLocationName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markerInstance, setMarkerInstance] = useState<any>(null);

  // 현재 위치를 가져와 markerPosition 업데이트
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          // (아래 useEffect에서 지도/마커 업데이트 처리)
        },
        (error) => {
          console.error("현재 위치를 가져오지 못했습니다.", error);
        }
      );
    } else {
      console.error("Geolocation API를 지원하지 않습니다.");
    }
  };

  // 역지오코딩: 좌표 → 주소(또는 위치명)
  const getLocationName = (lat: number, lng: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = (window as any).naver.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (status: any, response: any) => {
        if (status === (window as any).naver.maps.services.Status.OK) {
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
      const geocoder = (window as any).naver.maps.services.Geocoder();
      geocoder.addressSearch(query, (status: any, response: any) => {
        if (status === (window as any).naver.maps.services.Status.OK) {
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
    if (!(window as any).naver || !(window as any).naver.maps) {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
      return;
    }

    // 지도 생성
    const map = new (window as any).naver.maps.Map(mapRef.current, {
      center: new (window as any).naver.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      ),
      zoom: 18,
      maxZoom: 18,
      minZoom: 15,
    });
    setMapInstance(map);

    // 마커 생성 (드래그 가능)
    const marker = new (window as any).naver.maps.Marker({
      position: new (window as any).naver.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      ),
      map: map,
      draggable: true,
    });
    setMarkerInstance(marker);

    // 마커 드래그 종료 이벤트 처리
    (window as any).naver.maps.Event.addListener(
      marker,
      "dragend",
      function () {
        const pos = marker.getPosition();
        const newLat = pos.y;
        const newLng = pos.x;
        setMarkerPosition({ lat: newLat, lng: newLng });
      }
    );

    // 지도 클릭 시 마커 이동 이벤트 처리
    (window as any).naver.maps.Event.addListener(
      map,
      "click",
      function (e: any) {
        const clickedPosition = e.coord; // {x, y} 형태
        marker.setPosition(clickedPosition);
        const newLat = clickedPosition.y;
        const newLng = clickedPosition.x;
        setMarkerPosition({ lat: newLat, lng: newLng });
      }
    );

    // 초기 로드 시에도 역지오코딩 호출
    getLocationName(markerPosition.lat, markerPosition.lng)
      .then((name) => setLocationName(name))
      .catch((err) => console.error(err));

    // 페이지가 로드될 때 현재 위치 가져오기
    fetchCurrentLocation();
  }, []);

  // markerPosition 상태 변경 시 지도와 마커 업데이트 및 역지오코딩
  useEffect(() => {
    if (mapInstance && markerInstance) {
      const newLatLng = new (window as any).naver.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      );
      markerInstance.setPosition(newLatLng);
      mapInstance.setCenter(newLatLng);
      getLocationName(markerPosition.lat, markerPosition.lng)
        .then((name) => setLocationName(name))
        .catch((err) => console.error(err));
    }
  }, [markerPosition, mapInstance, markerInstance]);

  // 주소 검색 버튼 클릭 시
  const handleSearch = async () => {
    try {
      const result = await searchAddress(searchQuery);
      setMarkerPosition(result);
      // 이후 useEffect가 markerPosition 변경을 감지하여 업데이트
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

  // 지도 내부 '현재 위치' 버튼 클릭 시 재조회
  const handleGoToCurrentLocation = () => {
    fetchCurrentLocation();
  };

  return (
    <div className={cn("w-full h-full relative", className)}>
      <div ref={mapRef} className="w-full h-full rounded-3xl" />
      <button
        onClick={handleGoToCurrentLocation}
        className="absolute top-4 right-4 z-[130] p-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow"
      >
        <MdMyLocation />
      </button>
      <div className="w-full px-4 text-base absolute bottom-0 left-0 z-[120] h-auto pb-8 pt-6 backdrop-blur-md bg-white rounded-t-2xl">
        <Button
          onClick={handleSelect}
          className="w-full rounded-xl bg-blue-2 border-blue-2 text-white py-3"
        >
          출발지로 설정
        </Button>
        <Button
          onClick={() => setIsSearchVisible((prev) => !prev)}
          className="flex justify-center items-center gap-1 text-blue-2 mt-2 border-none"
        >
          <p>출발지 검색하기</p>
          <IoIosArrowForward />
        </Button>
      </div>
      {isSearchVisible && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-[130] w-11/12 px-4 py-2 bg-white bg-opacity-90 rounded-lg shadow">
          <input
            type="text"
            placeholder="주소 입력"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border p-2"
          />
          <Button onClick={handleSearch} className="w-full mt-2">
            검색
          </Button>
        </div>
      )}
    </div>
  );
};

export default NaverMapSelector;
