import React from "react";
import { cn } from "../../utils/classname";
import BaseCheckBox from "./BaseCheckBox";

type OptionCheckBoxProps = {
  className?: string;
  isChecked?: boolean;
  onToggle: () => void;
  onView?: () => void;
  label?: string;
  disabled?: boolean;
  showViewButton?: boolean;
};

const OptionCheckBox: React.FC<OptionCheckBoxProps> = ({
  className,
  isChecked = false,
  onToggle,
  onView,
  label,
  disabled = false,
  showViewButton = true,
}) => {
  const handleCheckBoxToggle = () => {
    if (!disabled) {
      onToggle();
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
    if (onView) {
      onView();
    }
  };

  const handleLabelClick = () => {
    if (!disabled) {
      onToggle();
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-row items-center font-normal",
        disabled && "opacity-50",
        className,
      )}
    >
      <div
        className={cn(
          "cursor-pointer",
          disabled && "pointer-events-none cursor-not-allowed",
        )}
        onClick={handleCheckBoxToggle}
      >
        <BaseCheckBox
          isChecked={isChecked}
          onChange={handleCheckBoxToggle}
          disabled={disabled}
          size="md"
        />
      </div>

      {label && (
        <div
          className={cn(
            "ml-2 flex-1 cursor-pointer text-sm duration-100",
            isChecked ? "text-black-1" : "text-gray-400",
            disabled && "pointer-events-none cursor-not-allowed",
          )}
          onClick={handleLabelClick}
        >
          {label}
        </div>
      )}

      {/* 보기 버튼 - 독립적으로 클릭 가능 */}
      {showViewButton && (
        <button
          type="button"
          className={cn(
            "ml-auto border-b border-gray-400 text-[12px] leading-none text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-600",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={handleViewClick}
          disabled={disabled}
        >
          보기
        </button>
      )}
    </div>
  );
};

export default OptionCheckBox;
