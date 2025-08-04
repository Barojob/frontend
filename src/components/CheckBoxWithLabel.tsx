import React from "react";
import { cn } from "../utils/classname";
import CheckBox, { Props as CheckBoxProps } from "./CheckBox";

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
        "flex items-center gap-x-2 font-normal",
        disabled && "opacity-50",
        className,
      )}
    >
      <label
        className={cn(
          "cursor-pointer text-base duration-200",
          checked ? "text-black-1" : "text-gray-400",
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
