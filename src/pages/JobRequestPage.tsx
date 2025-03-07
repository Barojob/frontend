import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationSelectStep from "@/component/JobRequest/LocationSelectStep";
import LeftArrowIcon from "@/svgs/LeftArrowIcon";
import MapModal from "@/component/JobRequest/MapModal";

const JobRequestPage: React.FC = () => {
  const [recentLocations] = useState([
    "서울시",
    "용인시",
    "대구시",
    "부산시",
    "광주시",
  ]);

  const [selectedRecentLocation, setSelectedRecentLocation] =
    useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const handleRecentLocationClick = (location: string) => {
    setSelectedRecentLocation(location);
  };

  const handleConfirmRecentLocation = () => {
    setCurrentLocation(selectedRecentLocation);
  };

  const handleCurrentLocationClick = () => {
    setIsMapOpen(true);
  };

  const handleMapSelect = (location: string) => {
    setCurrentLocation(location);
    setIsMapOpen(false);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-white h-full w-full flex flex-col ">
      <LeftArrowIcon onClick={handleBack} className="ml-4 mt-4" />
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
        <MapModal
          onMapSelect={handleMapSelect}
          onClose={() => setIsMapOpen(false)}
        />
      )}
    </div>
  );
};

export default JobRequestPage;
