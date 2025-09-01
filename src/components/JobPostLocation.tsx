import LocationSelector from "@/components/JobPost/LocationSelector";
import React from "react";
import { useNavigate } from "react-router-dom";

type LocationData = {
  address: string;
  latitude: number;
  longitude: number;
  placeName?: string;
};

type Props = {
  className?: string;
  onLocationConfirm?: (location: LocationData) => void;
};

const JobPostLocation: React.FC<Props> = ({
  className = "",
  onLocationConfirm,
}) => {
  const navigate = useNavigate();

  const handleLocationConfirm = (location: LocationData) => {
    // 외부에서 전달된 onLocationConfirm이 있으면 그것을 사용, 없으면 기본 동작
    if (onLocationConfirm) {
      onLocationConfirm(location);
    } else {
      // 기본 동작: job-posting 페이지로 이동하면서 선택된 위치 정보 전달
      navigate("/job-posting", { state: { selectedLocation: location } });
    }
  };

  return (
    <div className={className}>
      <LocationSelector onLocationConfirm={handleLocationConfirm} />
    </div>
  );
};

export default JobPostLocation;
