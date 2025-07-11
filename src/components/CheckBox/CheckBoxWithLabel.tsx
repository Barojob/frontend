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
  name?: string;
  value?: string;
  id?: string;
};

const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = ({
  className,
  isChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  labelPosition = "right",
  name,
  value,
  id,
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
    <BaseCheckBox
      isChecked={isChecked}
      onChange={handleCheckBoxToggle}
      disabled={disabled}
      size={size}
      name={name}
      value={value}
      id={id}
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

export default CheckBoxWithLabel;
