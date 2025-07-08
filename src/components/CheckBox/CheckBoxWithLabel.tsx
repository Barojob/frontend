import React from "react";
import { cn } from "../../utils/classname";
import BaseCheckBox from "./BaseCheckBox";

type CheckBoxWithLabelProps = {
  className?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
};

const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = ({
  className,
  isChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  labelPosition = "right",
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  const labelElement = (
    <span
      className={cn(
        "cursor-pointer text-sm duration-100",
        isChecked ? "text-black-1" : "text-gray-400",
        disabled && "cursor-not-allowed opacity-50",
        labelPosition === "right" ? "ml-2" : "mr-2",
      )}
      onClick={handleClick}
    >
      {label}
    </span>
  );

  return (
    <div
      className={cn(
        "flex items-center font-normal",
        disabled && "pointer-events-none",
        className,
      )}
    >
      {labelPosition === "left" && labelElement}
      <BaseCheckBox
        isChecked={isChecked}
        onChange={onChange}
        disabled={disabled}
        size={size}
      />
      {labelPosition === "right" && labelElement}
    </div>
  );
};

export default CheckBoxWithLabel;
