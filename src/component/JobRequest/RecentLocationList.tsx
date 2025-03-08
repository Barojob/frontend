import { cn } from "@/utils/classname";

export type RecentLocation = {
  address: string;
  name: string;
};

type Props = {
  className?: string;
  recentLocations: RecentLocation[];
  selectedLocationAddress: string;
  onLocationClick: (location: RecentLocation) => void;
};

const RecentLocationList: React.FC<Props> = ({
  className,
  recentLocations,
  selectedLocationAddress,
  onLocationClick,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-lg text-gray-1 font-black">최근 출발한 위치</p>
      <div className="overflow-scroll px-2 pt-2">
        {recentLocations.map((location, index) => (
          <div
            key={index}
            onClick={() => onLocationClick(location)}
            className={cn(
              "cursor-pointer px-2 py-3 border-b border-gray-200",
              location.address === selectedLocationAddress
                ? "bg-blue-100"
                : "bg-transparent"
            )}
          >
            <p className="text-sm font-bold text-gray-1">{location.name}</p>
            <p className="text-[0.625rem] text-gray-2">{location.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLocationList;
