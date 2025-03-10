import { cn } from "@/utils/classname";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  const INITIAL_VISIBLE_COUNT = 5;
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleCollapse = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const itemsToShow = recentLocations.slice(0, visibleCount);
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <p className="text-lg text-gray-1 font-black pb-2">최근 출발한 위치</p>
      <div className="flex-1 overflow-scroll px-2 flex flex-col pb-10">
        {itemsToShow.map((location, index) => (
          <div
            key={index}
            onClick={() => onLocationClick(location)}
            className={cn(
              "cursor-pointer px-2 py-2.5 border-b border-gray-200",
              location.address === selectedLocationAddress
                ? "bg-blue-100"
                : "bg-transparent"
            )}
          >
            <p className="text-sm font-bold text-gray-1">{location.name}</p>
            <p className="text-[0.625rem] text-gray-2">{location.address}</p>
          </div>
        ))}
        {recentLocations.length > visibleCount ? (
          <div
            className="bg-gray-100 mx-auto py-2 px-3 mt-4 text-gray-600 text-xs rounded-lg border flex items-center gap-2"
            onClick={handleLoadMore}
          >
            <p className="leading-none text-xs">5개 더보기</p>
            <IoIosArrowDown />
          </div>
        ) : (
          recentLocations.length > INITIAL_VISIBLE_COUNT && (
            <div
              className="bg-gray-100 mx-auto py-2 px-3 mt-4 text-gray-600 text-xs rounded-lg border flex items-center gap-2"
              onClick={handleCollapse}
            >
              <p className="leading-none text-xs">5개만 보기</p>
              <IoIosArrowUp />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecentLocationList;
