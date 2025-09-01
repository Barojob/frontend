import { Props as CheckBoxProps } from "@/components/CheckBox";
import CheckBoxWithLabel from "@/components/CheckBoxWithLabel";
import { cn } from "@/utils/classname";
import React from "react";

type Props = CheckBoxProps & {
  className?: string;
  label: string;
  onView?: () => void;
};

const TermCheckBox: React.FC<Props> = ({
  className,
  label,
  disabled,
  onView,
  ...props
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <CheckBoxWithLabel
        {...props}
        theme="primary"
        label={label}
        disabled={disabled}
      />

      {onView && (
        <button
          className={cn(
            "text-sm font-normal text-gray-500 underline hover:text-gray-700",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          type="button"
          disabled={disabled}
          onClick={onView}
        >
          보기
        </button>
      )}
    </div>
  );
};

export default TermCheckBox;
