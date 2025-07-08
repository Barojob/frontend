import React from "react";
import { cn } from "../../utils/classname";

type BaseCircleCheckBoxProps = {
  className?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export const BaseCircleCheckBox: React.FC<BaseCircleCheckBoxProps> = ({
  className,
  isChecked = false,
  onChange,
  disabled = false,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "size-5",
    md: "size-7",
    lg: "size-9",
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(
        "cursor-pointer transition-all duration-200",
        sizeClasses[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={handleClick}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className={cn(
          "duration-200",
          isChecked ? "fill-blue-600" : "fill-gray-100",
        )}
      />
      <path
        d="M8.5 12L11 15L16.5 9"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type CircleCheckBoxWithLabelProps = {
  className?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
};

export const CircleCheckBoxWithLabel: React.FC<
  CircleCheckBoxWithLabelProps
> = ({
  className,
  isChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  labelPosition = "right",
}) => {
  const handleCheckBoxToggle = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  const handleLabelClick = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  const checkboxElement = (
    <BaseCircleCheckBox
      isChecked={isChecked}
      onChange={handleCheckBoxToggle}
      disabled={disabled}
      size={size}
    />
  );

  const labelElement = (
    <div
      className={cn(
        "cursor-pointer text-base duration-200",
        isChecked ? "text-black-1" : "text-gray-400",
        disabled && "cursor-not-allowed opacity-50",
        labelPosition === "left" ? "mr-2" : "ml-2",
      )}
      onClick={handleLabelClick}
    >
      {label}
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-full flex-row items-center font-normal",
        disabled && "opacity-50",
        className,
      )}
    >
      {labelPosition === "left" && labelElement}
      {checkboxElement}
      {labelPosition === "right" && labelElement}
    </div>
  );
};

// 호환성을 위한 기본 export (기존 코드가 깨지지 않도록)
type LegacyCircleCheckBoxProps = {
  className?: string;
  isChecked: boolean;
  onToggle: () => void;
  label: string;
};

const CircleCheckBox: React.FC<LegacyCircleCheckBoxProps> = ({
  className,
  isChecked,
  onToggle,
  label,
}) => {
  return (
    <CircleCheckBoxWithLabel
      className={className}
      isChecked={isChecked}
      onChange={() => onToggle()}
      label={label}
    />
  );
};

export default CircleCheckBox;
