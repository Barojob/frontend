import { cn } from "@/utils/classname";
import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  backTo?: string; // 특정 경로로 이동하고 싶을 때 사용
};

const NavigationHeader: React.FC<Props> = ({
  className,
  title,
  showBackButton = true,
  onBack,
  backTo,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      // 기본적으로 브라우저 뒤로가기
      navigate(-1);
    }
  };

  return (
    <div
      className={cn("mt-4 flex w-full items-center text-gray-500", className)}
    >
      {showBackButton && (
        <HiChevronLeft
          className="cursor-pointer touch-manipulation text-3xl"
          onClick={handleBackClick}
        />
      )}
      <div className={cn("", showBackButton ? "ml-1" : "")}>{title}</div>
    </div>
  );
};

export default NavigationHeader;
