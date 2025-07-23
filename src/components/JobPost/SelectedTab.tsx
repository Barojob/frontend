import { cn } from "../../utils/classname";

type SelectedTabProps = {
  title: string;
  selectedContent: string;
  amount?: string | number;
  priceTitle?: string;
  className?: string;
  onClick?: () => void;
};

/* eslint-disable react/prop-types */
const SelectedTab: React.FC<SelectedTabProps> = ({
  title,
  selectedContent,
  amount,
  priceTitle,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      onClick={onClick}
    >
      <div className="flex-1">
        <span className="text-base font-normal text-gray-500">{title}</span>
      </div>
      <div className="flex-1">
        <span className="text-base font-bold text-neutral-600">
          {selectedContent}
        </span>
      </div>
      <div className="flex-1 text-right">
        <div className="leading-1 text-[9px] font-normal text-gray-400">
          {priceTitle}
        </div>
        <span className="text-lg font-bold text-blue-600">
          {typeof amount === "number" ? `+ ${amount.toLocaleString()}` : amount}
        </span>
        {amount && <span className="text-lg font-bold text-blue-600">원</span>}
      </div>
    </div>
  );
};

export default SelectedTab;
