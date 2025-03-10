import { cn } from "@/utils/classname";
import Button from "../Button/Button";
import RecentLocationList, { RecentLocation } from "./RecentLocationList";

type Props = {
  className?: string;
  pick?: string;
  recentLocations: RecentLocation[];
  selectedRecentLocation: RecentLocation | null;
  onLocationClick: (location: RecentLocation) => void;
  onConfirmRecentLocation: () => void;
  onCurrentLocationClick: () => void;
};

const LocationSelectStep: React.FC<Props> = ({
  className,
  pick,
  recentLocations,
  selectedRecentLocation,
  onLocationClick,
  onConfirmRecentLocation,
  onCurrentLocationClick,
}) => {
  return (
    <div className={cn("px-4 pt-5 flex flex-col", className)}>
      <p className="text-gray-3 text-2xl font-bold text-center">
        출발 위치를 설정해주세요
      </p>
      <Button
        className="w-full leading-none text-sm text-left px-5 py-2 mt-4 rounded-3xl bg-blue-500 border-blue-500 text-white font-normal"
        onClick={onCurrentLocationClick}
      >
        ◦ 현위치: {pick || "설정 안됨"}
      </Button>
      <RecentLocationList
        className="mt-8 flex-1 overflow-hidden"
        recentLocations={recentLocations}
        selectedLocationAddress={
          selectedRecentLocation ? selectedRecentLocation.address : ""
        }
        onLocationClick={onLocationClick}
      />
      <div className="px-4 py-5 flex flex-col gap-2">
        <Button className="w-full text-center rounded-xl bg-blue-2 border-blue-2 text-white py-3">
          출발지로 설정하기
        </Button>
      </div>
    </div>
  );
};
export default LocationSelectStep;
