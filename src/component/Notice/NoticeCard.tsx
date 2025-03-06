import { cn } from "@/utils/classname";
import Chip from "../Chip";

type Props = {
  className?: string;
  date?: string;
  location?: string;
  workerType?: string;
  wage?: number;
};

const NoticeCard: React.FC<Props> = ({
  className,
  date,
  location,
  workerType,
  wage,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-gray-0 rounded-[1.25rem] px-6 py-1.5",
        className
      )}
    >
      <div className="flex flex-col relative font-semibold pt-1.5">
        <p className="text-gray-3 text-xs text-left">{date}</p>
        <p className="text-gray-3 text-xs text-left">{location}</p>
        <div className="flex gap-1.5 mt-3.5 pb-1">
          <Chip children="점심제공" className="bg-blue-5" />
          <Chip children="무료주차" className="bg-blue-5" />
        </div>
        <div className="absolute bottom-0 right-0 text-right gap-1">
          <p className="text-gray-2 text-[0.625rem] leading-1">{workerType}</p>
          <p className="text-gray-3 text-[1.063rem] leading-none">{wage}원</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
