import CheckBoxIcon from "@/svgs/CheckBoxIcon";
import RoundCheckBoxIcon from "@/svgs/RoundCheckBoxIcon";
import { cn } from "@/utils/classname";
import React from "react";

export type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onClick" | "onChange" | "onClickCapture" | "value" | "size"
> & {
  className?: string;
  theme: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onChange?: (checked: boolean) => void;
};

const CheckBox: React.FC<Props> = ({
  className,
  theme,
  size = "md",
  checked,
  disabled,
  onChange,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        className="peer hidden"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
        {...props}
      />

      <button
        className={cn(
          "text-gray-100 peer-checked:text-blue-600",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
        onClick={handleVisualClick}
      >
        {theme === "primary" ? (
          <CheckBoxIcon
            className={cn(
              size === "sm" && "size-5",
              size === "md" && "size-7",
              size === "lg" && "size-9",
            )}
          />
        ) : (
          theme === "secondary" && (
            <RoundCheckBoxIcon
              className={cn(
                size === "sm" && "size-5",
                size === "md" && "size-7",
                size === "lg" && "size-9",
              )}
            />
          )
        )}
      </button>
    </>
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.checked);
  }

  function handleVisualClick() {
    inputRef.current?.click();
  }
};

export default CheckBox;
