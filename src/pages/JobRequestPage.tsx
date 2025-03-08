// JobRequestPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelectStep from "@/component/JobRequest/LocationSelectStep";
import LeftArrowIcon from "@/svgs/LeftArrowIcon";
import NaverMapSelector from "@/component/NaverMapSelector";
import { RecentLocation } from "@/component/JobRequest/RecentLocationList";
import StepIndicator from "@/component/JobRequest/StepIndicator"; // 추가

const JobRequestPage: React.FC = () => {
  // 초기 최근 위치 데이터 (예시)
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([
    { address: "서울시 동대문구 장안동 123-4", name: "장안 2동 주민센터" },
    { address: "용인시 수지구 죽전동 123-4", name: "죽전 주민센터" },
    { address: "대구시 수성구 수성동 123-4", name: "수성 주민센터" },
    { address: "부산시 해운대구 우동 123-4", name: "우동 주민센터" },
    { address: "광주시 서구 농성동 123-4", name: "농성 주민센터" },
  ]);

  const [selectedRecentLocation, setSelectedRecentLocation] =
    useState<RecentLocation | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  // 현재 스텝을 관리 (예: 1: 출발지, 2: 도착지, 3: 확인)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleRecentLocationClick = (location: RecentLocation) => {
    setSelectedRecentLocation(location);
  };

  // 최근 리스트에서 선택한 항목을 확정하는 경우
  const handleConfirmRecentLocation = () => {
    if (selectedRecentLocation) {
      setCurrentLocation(selectedRecentLocation.address);
      // 이후 스텝으로 진행
      setCurrentStep(2);
    }
  };

  // 현위치 버튼 클릭 시 지도 영역 토글 (모달 대신 inline으로 노출)
  const handleCurrentLocationClick = () => {
    setIsMapOpen(!isMapOpen);
  };

  // 지도 영역에서 위치 선택 후 호출
  const handleMapSelect = (location: RecentLocation) => {
    setCurrentLocation(location.address);
    // 새로운 위치가 이미 리스트에 없으면 추가 (중복 체크)
    setRecentLocations((prev) => {
      const exists = prev.find((loc) => loc.address === location.address);
      return exists ? prev : [location, ...prev];
    });
    setIsMapOpen(false);
    // 이후 스텝으로 진행할 수도 있음
    setCurrentStep(2);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-white h-full w-full flex flex-col">
      <LeftArrowIcon onClick={handleBack} className="ml-4 mt-4" />
      {/* 페이지 인디케이터 추가 */}
      <StepIndicator currentStep={currentStep} className="px-4" />
      <LocationSelectStep
        className="mt-2"
        pick={currentLocation}
        recentLocations={recentLocations}
        selectedRecentLocation={selectedRecentLocation}
        onLocationClick={handleRecentLocationClick}
        onConfirmRecentLocation={handleConfirmRecentLocation}
        onCurrentLocationClick={handleCurrentLocationClick}
      />
      {isMapOpen && (
        <div className="mt-4">
          <NaverMapSelector onSelect={handleMapSelect} />
        </div>
      )}
    </div>
  );
};

export default JobRequestPage;
