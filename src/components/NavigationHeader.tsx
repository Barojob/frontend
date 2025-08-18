import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
};

const NavigationHeader: React.FC<Props> = ({
  className,
  title,
  showBackButton = true,
  onBack,
}) => {
  return (
    <div
      className={cn("mt-4 flex w-full items-center text-gray-500", className)}
    >
      {showBackButton && (
        <HiOutlineChevronLeft
          className="cursor-pointer text-lg"
          onClick={onBack}
        />
      )}
      <div className={cn("", showBackButton ? "ml-1" : "")}>{title}</div>
    </div>
  );
};

export default NavigationHeader;
