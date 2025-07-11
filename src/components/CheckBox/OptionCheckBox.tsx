import React from "react";
import { cn } from "../../utils/classname";
import CheckBoxWithLabel from "./CheckBoxWithLabel";

type OptionCheckBoxProps = {
  className?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onView?: () => void;
  name?: string;
  value?: string;
  id?: string;
};

const OptionCheckBox: React.FC<OptionCheckBoxProps> = ({
  className,
  isChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  onView,
  name,
  value,
  id,
}) => {
  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onView) {
      onView();
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between font-normal",
        disabled && "opacity-50",
        className,
      )}
    >
      {/* 체크박스와 라벨 영역 */}
      <CheckBoxWithLabel
        isChecked={isChecked}
        onChange={onChange}
        label={label}
        disabled={disabled}
        size={size}
        labelPosition="right"
        name={name}
        value={value}
        id={id}
        className="flex-1"
      />

      {/* 보기 버튼 */}
      {onView && (
        <button
          type="button"
          onClick={handleViewClick}
          disabled={disabled}
          className={cn(
            "ml-4 cursor-pointer text-sm text-gray-500 underline transition-colors hover:text-gray-700",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          보기
        </button>
      )}
    </div>
  );
};

export default OptionCheckBox;
