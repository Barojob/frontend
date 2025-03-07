import { cn } from "@/utils/classname";

type Props = {
  className?: string;
  recentLocations: string[];
  selectedLocation: string;
  onLocationClick: (location: string) => void;
};

const RecentLocationList: React.FC<Props> = ({
  className,
  recentLocations,
  selectedLocation,
  onLocationClick,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-lg text-gray-1 font-bold">최근 출발한 위치</p>
      <div className="overflow-scroll px-2">
        {recentLocations.map((location, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer p-2 rounded",
              location === selectedLocation ? "bg-blue-200" : "bg-transparent"
            )}
            onClick={() => onLocationClick(location)}
          >
            {location}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLocationList;
