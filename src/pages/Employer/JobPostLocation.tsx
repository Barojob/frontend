import React from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../../components/JobPost/LocationSelector";

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

  // 사용자 타입 확인 함수
  const getUserType = (): "worker" | "employer" => {
    const userType = localStorage.getItem("userType");
    return userType === "employer" ? "employer" : "worker";
  };

  const handleLocationConfirm = (location: LocationData) => {
    if (onLocationConfirm) {
      onLocationConfirm(location);
    } else {
      // 사용자 타입에 따라 다른 페이지로 이동
      const userType = getUserType();
      console.log(" 현재 사용자 타입:", userType);
      if (userType === "employer") {
        navigate("/job-posting", { state: { selectedLocation: location } });
      } else {
        navigate("/commute-range", { state: { selectedLocation: location } });
      }
    }
  };

  return (
    <div className={className}>
      <LocationSelector onLocationConfirm={handleLocationConfirm} />
    </div>
  );
};

export default JobPostLocation;
