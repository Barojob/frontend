import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { cn } from "../../utils/classname";

type Props = {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
};

const NavigationHeader: React.FC<Props> = ({
  title,
  onBack,
  showBackButton = true,
  className,
}) => {
  const handleTitleClick = () => {
    if (showBackButton && onBack) {
      onBack();
    }
  };

  return (
    <div
      className={cn("mt-4 flex w-full items-center text-gray-500", className)}
    >
      {showBackButton && (
        <HiOutlineChevronLeft
          className="text-lg"
          onClick={onBack}
          onTouchStart={onBack}
        />
      )}
      <div
        className={cn("", showBackButton ? "ml-1 cursor-pointer" : "")}
        onClick={handleTitleClick}
        onTouchStart={handleTitleClick}
      >
        {title}
      </div>
    </div>
  );
};

export default NavigationHeader;
