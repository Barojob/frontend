import CheckBox, { Props as CheckBoxProps } from "@/components/CheckBox";
import { cn } from "@/utils/classname";
import React from "react";

type Props = CheckBoxProps & {
  className?: string;
  label: string;
  labelPosition?: "left" | "right";
};

const CheckBoxWithLabel: React.FC<Props> = ({
  className,
  label,
  labelPosition = "right",
  disabled,
  checked,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2",
        disabled && "opacity-50",
        className,
      )}
    >
      <label
        className={cn(
          "cursor-pointer text-base font-normal",
          checked && "text-black-1",
          !checked && "text-gray-400",
          disabled && "cursor-not-allowed opacity-50",
          labelPosition === "right" && "order-last",
        )}
        htmlFor={props.id}
      >
        {label}
      </label>
      <CheckBox {...props} disabled={disabled} checked={checked} />
    </div>
  );
};

export default CheckBoxWithLabel;
